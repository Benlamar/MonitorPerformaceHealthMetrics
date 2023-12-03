const express = require('express')
const router = express.Router()

const os = require('os')
const osu = require('node-os-utils');
const nodeDiskInfo = require('node-disk-info');
const { performace } = require('perf_hooks')

const cpu = osu.cpu
const drive = osu.drive
const mem = osu.mem

const bytesToGB = (bytes) => {
    return (bytes / Math.pow(1024, 3)).toFixed(2);
}

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});


router.get("/cpu", async (req, res) => {
    const cpus = os.cpus();
    const totalCores = cpus.length;
    const baseSpeed = cpus[0].speed; // Assumming for all cores
    let cpuModel = cpu.model();

    let usage = await cpu.usage();
    let free = await cpu.free()
    let average = await cpu.average();

    cores = {}
    cpus.forEach((cpu, i) => {
        cores[i] = { 'model': cpu.model, 'speed': cpu.speed + 'MHz' }
    })

    res.send({
        cpuModel: cpuModel,
        baseSpeed: baseSpeed,
        totalCores: totalCores,
        totalUsage: usage + "%",
        free: free + "%",
        cores: cores,
        average: average,
    });
})

router.get("/memory", async (req, res) => {
    let memInfo = await mem.info()
    res.send(memInfo)
})

router.get("/storage", async (req, res) => {
    const platform = os.platform();
    const driveInfo = { totalSpace: '', usedSpace: '', freepace: '' }
    if (platform === 'win32') {
        const drives = await nodeDiskInfo.getDiskInfo();
        const disk = drives.find(d => d._mounted === 'C:')
        if (disk) {
            let totalSpaceInGB = bytesToGB(disk._blocks)
            let usedSpaceInGB = bytesToGB(disk._used)
            let freeSpaceInGB = bytesToGB(disk._available)
            driveInfo.totalSpace = totalSpaceInGB
            driveInfo.usedSpace = usedSpaceInGB
            driveInfo.freepace = freeSpaceInGB
        }
    }
    else {
        const disk = await drive.info();
        driveInfo.totalSpace = disk.totalGb
        driveInfo.usedSpace = disk.usedGb,
            driveInfo.freepace = disk.freeGb
    }

    res.send({
        storage: driveInfo
    });
})

router.get("/latency", (req, res) => {
    const start = performance.now();
    // Simulate some server processing
    setTimeout(() => {
        const end = performance.now();
        const latency = end - start;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Latency: ${latency.toFixed(2)} ms`);
    }, 1000);
})

router.get("/response-time", (req, res) => {
    res.send("RT")
})
module.exports = router