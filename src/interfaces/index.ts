import { NotificationType } from "../types"
import { APIType, EndpointsType } from "../types"
import { AnalyticsType, AnalyticsLog, UserProfileType, SubscriptionType } from "../types"

export interface DeviceInfo {
    browserFullVersion: string
    browserMajorVersion: string
    browserName: string
    engineName: string
    engineVersion: string
    isBrowser: boolean
    osName: string
    osVersion: string
    userAgent: string
}

export interface Location {
    lat: number
    lon: number
    time: number
}

export interface AddApiProps {
    name: string
    category: string
    description: string
    base_url: string
}

export interface EndpointProps {
    id?: string | undefined
    name: string
    route: string
    method: string
}

export interface ApiProps {
    id: string
    name:	string
    description: string
    base_url: string
    about?: string
    categoryId?:	string
    logo_url?: string
    api_website?: string
    term_of_use?: string
    visibility?: string
    secretKey?: string
    endpoints?: Array<EndpointProps | null>
}

export interface UserApis {
    apis: Array<ApiProps | null>
}

export interface HeaderObject {
    key: string
    value: string
}

export interface CardProps {
    id?: string
    name?: string
    description?: string
    rating?: number
    latency?: number
    popularity?: number
}

export interface IErrorType { 
    error?: any 
}

export interface Ibrand {
    img : string
    alt : string
}

export interface NotificationState {
    notifications: Array<NotificationType>
    content: "newSubscription" | "unSubscription" | "apiHosted" | "apiDown" | null
    isRead: boolean
}

export interface ModalState {
    loading: "idle" | "pending" | "fulfilled" | "rejected" | boolean
    error?: any
    action: string
    type:string
    modalData: string
}

export interface FreeApiState {
    freeApis: APIType[]
    isLoading: Boolean
    error?: any
}

export interface Endpoints {
    endpoints: Array<EndpointsType | null>
}

export interface ApiState {
    apis: Array<APIType>
    categories: Array<APIType>
    loading: "idle" | "pending" | "fulfilled" | "rejected"
    error?: any
}

export interface AnalyticState {
    analytics: AnalyticsType | any
    analyticsLog: Array<AnalyticsLog>
    isLoading: Boolean
    error?: any
}

export interface UserState {
    user: UserProfileType | Object
    userApis: Array<APIType>
    subscribedApis: Array<SubscriptionType>
    loading: "idle" | "pending" | "fulfilled" | "rejected"
    error?: any
    isLoggedIn: boolean
}

export interface RunTestResponse {
    data: string
    message: string
    status: string | number
    success: boolean
    onClose: () => void
}