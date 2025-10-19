const { exec } = require('child_process');

const PORT = 3000;

function killPort() {
  const isWindows = process.platform === 'win32';
  
  if (isWindows) {
    exec(`netstat -ano | findstr :${PORT}`, (err, stdout) => {
      if (stdout) {
        const lines = stdout.split('\n');
        const pids = new Set();
        
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && !isNaN(pid)) {
            pids.add(pid);
          }
        });
        
        pids.forEach(pid => {
          exec(`taskkill /F /PID ${pid}`, (err) => {
            if (!err) console.log(`✅ Killed process ${pid} on port ${PORT}`);
          });
        });
        
        console.log(`🔫 Clearing port ${PORT}...`);
      } else {
        console.log(`✅ Port ${PORT} is free`);
      }
    });
  } else {
    // Mac/Linux
    exec(`lsof -ti:${PORT} | xargs kill -9`, (err) => {
      if (!err) {
        console.log(`✅ Killed process on port ${PORT}`);
      } else {
        console.log(`✅ Port ${PORT} is free`);
      }
    });
  }
}

killPort();
