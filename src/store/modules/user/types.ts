export interface UserState{
    name: string,
    avatar?: string,
    roles: string[],
    permission: string[],
    signature?: string, //个性签名
    jobName?: string, //职责名称
    group?: string, //岗位
    email?: string,
    profile?: string, //简介
    area?: string[], //区域
    address?: string, //具体地址
}
