const router = require('express').Router();
const Service = require('../models/Service');

// ПОЛУЧИТЬ ВСЕ УСЛУГИ
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ПОЛУЧИТЬ ОДНУ УСЛУГУ ПО ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Услуга не найдена' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// СОЗДАТЬ НОВУЮ УСЛУГУ
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ОБНОВИТЬ УСЛУГУ
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ error: 'Услуга не найдена' });
    }
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// УДАЛИТЬ УСЛУГУ
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Услуга не найдена' });
    }
    res.json({ message: 'Услуга удалена' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;