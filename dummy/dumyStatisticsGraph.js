// Helper function to generate random data
// Helper function to generate random data
const generateRandomData = (timestamp) => ({
    timestamp,
    min_value: parseFloat((Math.random() * 100).toFixed(2)),
    max_value: parseFloat((Math.random() * 100 + 50).toFixed(2)),
    avg_value: parseFloat((Math.random() * 100).toFixed(2)),
    stddev_value: parseFloat((Math.random() * 10).toFixed(2))
});


// Generate daily data (360 entries, different values every 2 seconds)
const generateDailyData = () => {
    let data = [];
    for (let i = 0; i < 360; i++) { // nanti ubah jadi 360
        let timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds() - i * 2); // Set 2 seconds apart
        data.push(generateRandomData(timestamp.toISOString()));
    }
    return data;
};

// Generate monthly data (12 entries, each 1 month apart)
const generateMonthlyData = () => {
    let data = [];
    for (let i = 0; i < 12; i++) {
        let timestamp = new Date();
        timestamp.setMonth(timestamp.getMonth() - i); // Set 1 month apart
        data.push(generateRandomData(timestamp.toISOString()));
    }
    return data;
};

// Generate yearly data (10 entries, each 1 year apart)
const generateYearlyData = () => {
    let data = [];
    for (let i = 0; i < 10; i++) {
        let timestamp = new Date();
        timestamp.setFullYear(timestamp.getFullYear() - i); // Set 1 year apart
        data.push(generateRandomData(timestamp.toISOString()));
    }
    return data;
};

const generateNowData = () => {
    let timestamp = new Date().toISOString();
    return generateRandomData(timestamp); // Return a single object
};

// Controller to handle the dummy API request
// Controller to handle the dummy API request
exports.getStatistics = (req, res) => {
    const { type, period } = req.query;

    if (!type || !period) {
        return res.status(400).json({ error: "type and period are required" });
    }

    if (period === "daily") {
        return res.status(200).json(generateDailyData());
    }

    if (period === "monthly") {
        return res.status(200).json(generateMonthlyData());
    }

    if (period === "yearly") {
        return res.status(200).json(generateYearlyData());
    }

    if (period === "now") {
        return res.status(200).json(generateNowData());
    }

    return res.status(400).json({ error: "Invalid period type" });
};



module.exports = exports;
