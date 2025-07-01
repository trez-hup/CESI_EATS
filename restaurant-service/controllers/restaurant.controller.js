const svc = require('../services/restaurant.service');

exports.create = async (req,res)=>res.status(201).json(await svc.create(req.body));
exports.list   = async (_req,res)=>res.json(await svc.list());
exports.get    = async (req,res)=>{
  const r=await svc.get(req.params.id);
  if(!r) return res.status(404).json({msg:'Not found'});
  res.json(r);
};
exports.update = async (req,res)=>{
  const r=await svc.update(req.params.id,req.body);
  if(!r) return res.status(404).json({msg:'Not found'});
  res.json(r);
};
exports.remove = async (req,res)=>{
  await svc.remove(req.params.id);
  res.json({msg:'Deleted'});
};
