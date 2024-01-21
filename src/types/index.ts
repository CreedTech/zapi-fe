import { HeaderObject } from "../interfaces";

export type APIType = {
   id: string
   name:	string
   description: string
   base_url: string
   about: string
   categoryId:	string
   logo_url?: string
   api_website: string
   term_of_use: string
   visibility: string
   secretKey: string
   read_me: string
   endpoints?: Array<EndpointsType | null>
   popularity?: number
   service_level?: number
   latency?: number
   createdBy?: Date | string
   createdOn?: Date | string
   updatedBy?: Date | string
   updatedOn?: Date | string
   deletedBy?: Date | string
   deletedOn?: Date | string
   discussions?: Array<DiscussionType | null>
   childrenDiscussions?: Array<ChildrenDiscussionType | null>
}

export type SubscriptionType = {
   id: string
   apiId: string
   name: string
   token: string
}

export type NotificationType = {
   // profileId: string
   content: string | null
   createdOn: string | Date | null
   isRead: boolean | null
}

export type UserResponseType = {
   access: string
   refresh: string
   userId: string
   profileId: string
   fullName: string
   email: string
}

export type UserProfileType = {
   id: string
   createdOn: string | Date | null
   createdBy: string | null
   updatedOn: string | Date | null
   updatedBy: string | null
   deletedOn: string | Date | null
   deletedBy: string | null
   email: string
   user_id: string
   subscriptions?: string[] | []
   publishedApis?: string[] | []
   followers?: string[] | []
   followering?: string[] | []
   picture?: object | string | null
}

export type DiscussionType = {
   id?: string | undefined
   title: string
   apiId?: string
   body: string
   profileId?: string
   createdOn?: Date | string
   childrenDiscussion?: Array<ChildrenDiscussionType | null>
   // picture: object | string | null
   // fullName: string
}

export type ChildrenDiscussionType = {
   id?: string | undefined
   apiId?: string
   body: string
   // discussionId: 
   profileId?: string
   discussions?: DiscussionType | null
   createdOn?: Date | string
}

export type EndpointsType = {
   id?: string | undefined
   name: string
   route: string
   method: string
   description: string
   headers?: Array<OptionsType>
   body?: Array<OptionsType>
   query?: Array<OptionsType>
   requestBody?: Array<ReqBody>
}

export type AnalyticsType = {
   id: string,
    createdOn: string | Date | null,
    createdBy: string | null,
    updatedOn: string | Date | null,
    updatedBy: string | null,
    deletedOn: string | Date | null,
    deletedBy: string | null,
    totalLatency: number,
    averageLatency: number,
    apiId: string,
    successful_calls: number,
    total_calls: number,
    total_errors: number
}

export type AnalyticsLog = {
   id: string,
   createdOn: string,
   latency: number,
   profileId: string,
   errorMessage: null,
   status: number,
   apiId: string,
   endpoint: string,
   method: string,
   version: string | null,
   location: string | null,
}

export type OptionsType = {
   name: string
   type?: string
   required?: boolean
   value?: any
}

export type ReqBody = {
   key: string;
   value: string | Date | boolean | number | object | symbol | Array<any>;
}

export type User = {
   profileId: string
   fullName: string
   picture?: string
}

export type ReviewType = {
   rating: number,
   review: string
   by: User
}

export type SubscribedUser = {
createdBy: string | null,
createdOn: string | Date | null,
deletedBy: string | null,
deletedOn: string | Date | null,
email: string
id: string
picture: string | null
subscriptions: string[]
updatedBy: string | null
updatedOn: string | Date | null,
userId: string
}

export type TestType = {
   name: string
   action: string
   icon: JSX.Element
}

export type TestResponse = {
   apiId?: string
   createdOn?: string | Date | null,
   createdBy?: string | null,
   deletedOn?: string | Date | null,
   deletedBy?: string | null,
   endpointId?: string
   id: string
   method: string
   name: string
   payload?: Array<OptionsType>
   profileId?: string
   route: string
   status: string
   updatedOn?: string | Date | null,
   updatedBy?: string | null,
}