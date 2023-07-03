
using placeholder_scada_back.Entities;

public static class GlobalVariables
{
    public static bool SystemStarted { get; set; } = false;
    public static readonly object AlarmsLogLock = new object();
    public static readonly object WorkersLock = new object();
    public static Dictionary<int, Thread> AnalogWorkers = new Dictionary<int, Thread>();
    public static Dictionary<int, Thread> DigitalWorkers = new Dictionary<int, Thread>();
    public static Dictionary<int, Thread> RTUWorkers = new Dictionary<int, Thread>();
    public static float[] AnalogTable { get; set; } = new float[21];
    public static bool[] DigitalTable { get; set; } = new bool[21];
    public static readonly object RngLock = new object();
    public static Random Rng { get; set; } = new Random();
    public static readonly object AnalogInputCacheLock = new object();
    public static Dictionary<int, AnalogInput> AnalogInputCache = new Dictionary<int, AnalogInput>();
    public static readonly object DigitalInputCacheLock = new object();
    public static Dictionary<int, DigitalInput> DigitalInputCache = new Dictionary<int, DigitalInput>();
    public static readonly object AnalogOutputCacheLock = new object();
    public static Dictionary<int, AnalogOutput> AnalogOutputCache = new Dictionary<int, AnalogOutput>();
    public static readonly object DigitalOutputCacheLock = new object();
    public static Dictionary<int, DigitalOutput> DigitalOutputCache = new Dictionary<int, DigitalOutput>();
}