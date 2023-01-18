const express = require('express');
const app = express();
const axios = require('axios');

app.get('/managed-records', async (req, res) => {
    try {
      const page = Number.parseInt(req.query.page || 1);
      const response = await axios.post(`http://localhost:3001/records?page=${page}`);
  
      // Transform the data
      const ids = response.data.map(item => item.id);
      const open = response.data.filter(item => item.disposition === 'open');
      const closedCount = response.data.filter(item => item.disposition === 'closed' && item.primaryColor).length;
      const previousPage = page > 1 ? page - 1 : null;
      const nextPage = response.data.length === 10 ? page + 1 : null;
  
      const transformedData = { ids, open, closedCount, previousPage, nextPage };
      res.json(transformedData);
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  app.listen(3000,() => {console.log("index started")})