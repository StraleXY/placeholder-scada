export interface Alarm {
    id: number,
    type: AlarmType,
    priority: number,
    tagId: number,
    threshold: number
}
export enum AlarmType {
    LOW, HIGH
}

export interface AnalogInput {
    id: number,
    description: string | null,
    address: number,
    scanTime: number,
    isOn: boolean,
    currentValue: number,
    readTime: string
    function: string
    lowLimit: number,
    highLimit: number,
    units: string | null,
    useRtu: boolean,
    alarms: Alarm[]
}

export interface CreateAnalogInput {
    description: string | null,
    address: number,
    scanTime: number,
    function: string
    lowLimit: number,
    highLimit: number,
    units: string | null
}

export interface DigitalInput {
    id: number,
    description: string | null,
    address: number,
    scanTime: number,
    isOn: boolean,
    currentValue: number,
    readTime: string,
    useRtu: boolean
}

export interface CreateDigitalInput {
    description: string | null,
    address: number,
    scanTime: number,
}

export interface TrendingState {
    analogInputs: AnalogInput[],
    digitalInputs: DigitalInput[]
}

export enum InputType {
    ANALOG, DIGITAL
}