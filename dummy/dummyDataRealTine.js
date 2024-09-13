exports.getRealtimeData = (req, res) => {
    const realtimeData = {
        flow: {
            data: (Math.random() * 100).toFixed(2),
            status: Math.round(Math.random()),
        },
        pressure: {
            data: (Math.random() * 10).toFixed(2),
            status: Math.round(Math.random()),
        },
        temperature: {
            data: (Math.random() * 200).toFixed(2),
            status: Math.round(Math.random()),
        },
        dryness: {
            data: (Math.random() * 2).toFixed(2),
            status: Math.round(Math.random()),
        },
        power_prediction: {
            data: (Math.random() * 50).toFixed(2),
            status: Math.round(Math.random()),
        },
    };

    res.json(realtimeData);
};
