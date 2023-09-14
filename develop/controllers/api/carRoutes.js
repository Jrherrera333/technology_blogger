const router = require('express').Router();
const {Car} = require('../../models');

router.get("/", async (req, res)=>{
    let cars = await Car.findAll()
    cars = cars.map(car => car.get({plain:true}))
    res.json(cars);


})
router.post("/", async (req, res)=>{
    let cars = await Car.create(req.body)
    res.json(cars);


})
router.put("/", async (req, res)=>{


})
router.delete("/", async (req, res)=>{
    let result = await Car.destroy

    
})

module.exports = router;