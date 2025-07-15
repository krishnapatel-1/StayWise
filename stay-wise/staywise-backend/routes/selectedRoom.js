import express from 'express';
import Router from 'express';
import PropertyDetails from '../models/PropertyDetails.js';
import PropertyDetail from '../models/PropertyDetails.js';

const router=Router();

router.get('/search', async (req, res) => {
  try {
    const loc = req.query.location;
    if (!loc) return res.status(400).json({ error: "Location is required" });

    const regex = new RegExp(loc, 'i');

    // Try splitting "street, city" if applicable
    const parts = loc.split(',').map(part => part.trim());
    const street = parts.length > 1 ? parts[0] : null;
    const city = parts.length > 1 ? parts[1] : parts[0];

    const query = {
      $or: [
        { 'location.city': new RegExp(city, 'i') },
        ...(street ? [{ 'location.street': new RegExp(street, 'i') }] : []),
        { 
          $expr: {
            $regexMatch: {
              input: { $concat: ['$location.street', ', ', '$location.city'] },
              regex: regex
            }
          }
        }
      ]
    };

    const rooms = await PropertyDetail.find(query);
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
