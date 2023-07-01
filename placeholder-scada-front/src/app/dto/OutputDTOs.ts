export interface AnalogOutput {
    Id: number,
    Description: string | null,
    Address: number,
    InitialValue: number,
    LowLimit: number,
    HighLimit: number,
    Units: string | null
}
export interface DigitalOutput {
    Id: number,
    Description: string | null,
    Address: number,
    InitialValue : number,
}