const express = require('express');
const cors = require('cors'); // Import CORS
const { getStatistics } = require('./dumyStatisticsGraph');
const { getRealtimeData } = require('./dummyDataRealTine');

const app = express();
const port = 3987;

// Enable CORS for all routes
app.use(cors());

app.get('/api/statisticsGraph', getStatistics); // http://localhost:3987/api/statisticsGraph?type=suhu&period=daily
app.get('/api/dataRealtime', getRealtimeData); // http://localhost:3987/api/dataRealtime

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
