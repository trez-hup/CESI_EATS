const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const config = require('../config');

// Inscription
exports.register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password) {
      return res.status(400).json({ message: "Email, nom et mot de passe sont obligatoires" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, name, password: hashedPassword }
    });

    res.status(201).json({ message: "Nouvel utilisateur créé !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Identifiants invalides" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Identifiants invalides" });

    const { accessToken, refreshToken } = generateTokens(user);

    // Enregistrement du refresh token en BDD
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 5 /** 24  * 60 */ * 60 * 1000) // 7 jours
      }
    });

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 1 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      sameSite: 'Lax',
      maxAge: 5 /** 24  * 60 */ * 60 * 1000
    });

    res.status(200).json({ message: "Vous êtes connecté !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    console.log("No refresh token in cookies");
    return res.status(401).json({ message: "Refresh token introuvable" });
  }

  try {
    const decoded = jwt.verify(token, config.refreshTokenSecret); // Peut lever une exception si expiré
    console.log("Decoded JWT refresh token:", decoded);

    const stored = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!stored) {
      console.log("RefreshToken absent de la BDD");
      return res.status(403).json({ message: "Token absent de la BDD" });
    }
    if (stored.revoked) {
      console.log("RefreshToken révoqué !");
      return res.status(403).json({ message: "Token révoqué" });
    }
    if (stored.expiresAt < new Date()) {
      console.log("RefreshToken expiré côté BDD !");
      return res.status(403).json({ message: "Token expiré" });
    }
    if (!stored.user) {
      console.log("Utilisateur lié au refreshToken introuvable !");
      return res.status(403).json({ message: "User introuvable" });
    }

    const newAccessToken = jwt.sign(
      {
        id: stored.user.id,
        email: stored.user.email,
        name: stored.user.name,
        role: stored.user.role
      },
      config.jwtSecret,
      { expiresIn: '1m' }
    );

    res.cookie('token', newAccessToken, {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 1 * 60 * 1000
    });

    return res.status(200).json({ message: "Token renouvelé" });
  } catch (err) {
    console.log("Erreur lors du refresh :", err);
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
};


// Logout
exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    await prisma.refreshToken.updateMany({
      where: { token },
      data: { revoked: true }
    });
  }

  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.json({ message: 'Déconnecté avec succès' });
};

// Get user info 
exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        createdAt: true,
        email: true,
        name: true,
        role: true
      }
    });

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Update account
exports.updateMe = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const updateData = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
      await prisma.refreshToken.updateMany({
        where: { userId: req.user.id },
        data: { revoked: true }
      });
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: { id: true, createdAt: true, email: true, name: true, role: true }
    });

    res.status(200).json({
      message: "Compte mis à jour",
      user: updated
    });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour" });
  }
};

// Delete account
exports.deleteMe = async (req, res) => {
  try {
    await prisma.refreshToken.deleteMany({ where: { userId: req.user.id } });
    await prisma.user.delete({ where: { id: req.user.id } });
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Compte supprimé" });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la suppression" });
  }
};



// Utilities
function generateTokens(user) {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    config.jwtSecret,
    { expiresIn: '3m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    config.refreshTokenSecret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}