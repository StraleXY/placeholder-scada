export interface AnalogOutput {
    id: number,
    description: string | null,
    address: number,
    initialValue: number,
    lowLimit: number,
    highLimit: number,
    units: string | null
}
export interface CreateAnalogOutput {
    description: string | null,
    address: number,
    initialValue: number,
    lowLimit: number,
    highLimit: number,
    units: string | null
}

export interface DigitalOutput {
    id: number,
    description: string | null,
    address: number,
    initialValue : number,
}
export interface CreateDigitalOutput {
    description: string | null,
    address: number,
    initialValue : number,
}

export interface RealTimeUnit {
    id: number,
    isAnalog: boolean,
    tagId: number,
    writeTime: number
}
export interface CreateRealTimeUnit {
    isAnalog: boolean,
    tagId: number,
    writeTime: number
}