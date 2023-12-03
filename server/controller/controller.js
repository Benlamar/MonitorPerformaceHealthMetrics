const db = require('../models/index')
// insert data to mongo DB
const insertData = (data) => {
    if (!data) {
        return false;
    }
    const record = new db.datas({
        heartbeat: data.heartbeat,
        blood_pressure: data.blood_pressure,
        oxygen_level: data.oxygen_level,
        distance: data.distance,
        mode: data.mode
    });

    try{
        record.save()
        .then((result) => {
            console.log("Inserted", result)
        })
        .catch((error) => {
            throw error;
        })
        return true;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return false;
    }
}

// get all data
const getAllData = () => {
    try {
        const allRecords = db.datas.find();
        return allRecords;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return []
    }
}

module.exports = { insertData, getAllData }