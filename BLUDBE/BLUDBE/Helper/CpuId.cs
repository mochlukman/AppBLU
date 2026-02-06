using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Helper
{
    public class CpuId
    {
        public string GetCpuId()
        {
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "wmic",
                    Arguments = "cpu get ProcessorId",
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                }
            };
            process.Start();
            string output = process.StandardOutput.ReadToEnd();
            process.WaitForExit();

            var processorId = output.Split('\n')[1]; // The first line is the title, the second line is the value.
            return processorId.Trim();
        }
    }
}
