const express = require("express");
const cors = require("cors");
require("dotenv").config();

const notifyRoutes = require("./routes/notify.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notify", notifyRoutes);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`✅ Notification service running on port ${PORT}`));
