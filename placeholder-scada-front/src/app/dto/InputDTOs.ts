export interface Alarm {
    Id: number,
    Type: AlarmType,
    Priority: number,
    TagId: number,
    Threshold: number
}
export enum AlarmType {
    LOW, HIGH
}

export interface AnalogInput {
    Id: number,
    Description: string | null,
    Address: number,
    ScanTime: number,
    IsOn: boolean,
    CurrentValue: number,
    ReadTime: string
    Function: string
    LowLimit: number,
    HighLimit: number,
    Units: string | null,
    UseRtu: boolean,
    Alarms: Alarm[]
}

export interface CreateAnalogInput {
    Description: string | null,
    Address: number,
    ScanTime: number,
    Function: string
    LowLimit: number,
    HighLimit: number,
    Units: string | null
}

export interface DigitalInput {
    Id: number,
    Description: string | null,
    Address: number,
    ScanTime: number,
    IsOn: boolean,
    CurrentValue: number,
    ReadTime: string,
    UseRtu: boolean
}

export interface CreateDigitalInput {
    Description: string | null,
    Address: number,
    ScanTime: number,
}

export interface TrendingState {
    AnalogInputs: AnalogInput[],
    DigitalInputs: DigitalInput[]
}

export enum InputType {
    ANALOG, DIGITAL
}