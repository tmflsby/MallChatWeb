import type {
  BadgeType,
  CacheBadgeItem,
  CacheBadgeReq,
  CacheUserItem,
  CacheUserReq,
  ContactItem,
  EmojiItem,
  GroupDetailReq,
  GroupStatisticType,
  ListResponse,
  MarkMsgReq,
  MessageReq,
  MessageType,
  MsgReadUnReadCountType,
  RequestFriendItem,
  SessionItem,
  UserInfoType,
  UserItem,
} from '@/services/types'
import { alovaInstance } from './request'
import urls from './urls'

type RequestConfig = Record<string, unknown>
type Params = Record<string, unknown>

const getRequest = <T>(url: string, config?: RequestConfig) => alovaInstance.Get<T>(url, config)
const postRequest = <T>(url: string, params?: Params) => alovaInstance.Post<T, unknown>(url, params)
const putRequest = <T>(url: string, params?: Params) => alovaInstance.Put<T, unknown>(url, params)
const deleteRequest = <T>(url: string, params?: Params) =>
  alovaInstance.Delete<T, unknown>(url, params)

export default {
  /** 获取群成员列表 */
  getGroupList: (params?: Params) =>
    getRequest<ListResponse<UserItem>>(urls.getGroupUserList, params),
  /** 获取群成员统计 */
  getMemberStatistic: () => getRequest<GroupStatisticType>(urls.getMemberStatistic),
  /** 房间内的所有群成员列表-@专用 */
  getAllUserBaseInfo: (params?: Params) =>
    getRequest<Pick<CacheUserItem, 'avatar' | 'name' | 'uid'>[]>(urls.getAllUserBaseInfo, params),
  /** 批量获取成员详细信息 */
  getUserInfoBatch: (users: CacheUserReq[]) =>
    postRequest<CacheUserItem[]>(urls.getUserInfoBatch, { reqList: users }),
  /** 批量获取徽章信息 */
  getBadgesBatch: (badges: CacheBadgeReq[]) =>
    postRequest<CacheBadgeItem[]>(urls.getBadgesBatch, { reqList: badges }),
  /** 获取消息列表 */
  getMsgList: (params?: Params) => getRequest<ListResponse<MessageType>>(urls.getMsgList, params),
  /** 发送��息 */
  sendMsg: (data?: MessageReq) => postRequest<MessageType>(urls.sendMsg, data),
  /** 标记消息，点赞等 */
  /** 获取用户详细信息 */
  getUserDetail: () => getRequest<UserInfoType>(urls.getUserInfoDetail, {}),
  /** 获取勋章列表 */
  getBadgeList: () => getRequest<BadgeType[]>(urls.getBadgeList, {}),
  /** 设置用户勋章 */
  setUserBadge: (badgeId: number) => putRequest<void>(urls.setUserBadge, { badgeId }),
  /** 修改用户名 */
  modifyUserName: (name: string) => putRequest<void>(urls.modifyUserName, { name }),
  /** 撤回消息 */
  recallMsg: (data: { msgId: number; roomId: number }) => putRequest<void>(urls.recallMsg, data),
  /** 拉黑用户 */
  blockUser: (data: { uid: number }) => putRequest<void>(urls.blockUser, data),
  /** 获取临时上传链接 */
  getUploadUrl: (params: Params) =>
    getRequest<{ downloadUrl: string; uploadUrl: string }>(urls.fileUpload, { params }),
  /** 新增表情包 */
  addEmoji: (data: { uid: number; expressionUrl: string }) =>
    postRequest<MessageType>(urls.addEmoji, data),
  /** 获取表情 **/
  getEmoji: (params: { uid: number }) => getRequest<EmojiItem[]>(urls.getEmoji, { params }),
  /** 删除id */
  deleteEmoji: (params: { id: number }) => deleteRequest<EmojiItem[]>(urls.deleteEmoji, params),
  /** 获取联系人列表 */
  getContactList: (params?: Params) =>
    getRequest<ListResponse<ContactItem>>(urls.getContactList, { params }),
  /** 获取好友申请列表 */
  requestFriendList: (params?: Params) =>
    getRequest<ListResponse<RequestFriendItem>>(urls.requestFriendList, { params }),
  /** 发送添加好友请求 */
  sendAddFriendRequest: (params: { targetUid: number; msg: string }) =>
    postRequest<EmojiItem[]>(urls.sendAddFriendRequest, params),
  /** 同意好友申请 */
  applyFriendRequest: (params: { applyId: number }) =>
    putRequest(urls.sendAddFriendRequest, params),
  /** 同意好友申请 */
  deleteFriend: (params: { targetUid: number }) => deleteRequest(urls.deleteFriend, params),
  /** 好友申请未读数 */
  newFriendCount: () => getRequest<{ unReadCount: number }>(urls.newFriendCount),
  /** 会话列表 */
  getSessionList: (params?: Params) =>
    getRequest<ListResponse<SessionItem>>(urls.getSessionList, params),
  /** 消息的已读未读列表 */
  getMsgReadList: (params?: Params) =>
    getRequest<ListResponse<{ uid: number }>>(urls.getMsgReadList, params),
  /** 消息已读未读数 */
  getMsgReadCount: (params?: Params) =>
    getRequest<MsgReadUnReadCountType[]>(urls.getMsgReadCount, params),
  /** 消息阅读上报 */
  markMsgRead: (params?: Params) =>
    putRequest<MsgReadUnReadCountType[]>(urls.getMsgReadCount, params),
  /** 新增群组 */
  createGroup: (params: { uidList: number[] }) =>
    postRequest<{ id: number }>(urls.createGroup, params),
  /** 邀请群成员 */
  inviteGroupMember: (params: { roomId: number; uidList: number[] }) =>
    postRequest(urls.inviteGroupMember, params),
  /** 删除群成员 */
  removeGroupMember: (params: { roomId: number; uid: number }) =>
    deleteRequest(urls.inviteGroupMember, params),
  /** 群组详情 */
  groupDetail: (params: { id: number }) => getRequest<GroupDetailReq>(urls.groupDetail, { params }),
  /** 会话详情 */
  sessionDetail: (params: { id: number }) =>
    getRequest<SessionItem>(urls.sessionDetail, { params }),
  /** 会话详情(联系人列表发消息用) */
  sessionDetailWithFriends: (params: { uid: number }) =>
    getRequest<SessionItem>(urls.sessionDetailWithFriends, { params }),
  /** 添加群管理 */
  addAdmin: ({ roomId, uidList }: { roomId: number; uidList: number[] }) =>
    putRequest<Boolean>(urls.addAdmin, {
      roomId,
      uidList,
    }),
  /** 撤销群管理 */
  revokeAdmin: ({ roomId, uidList }: { roomId: number; uidList: number[] }) =>
    deleteRequest<Boolean>(urls.revokeAdmin, {
      roomId,
      uidList,
    }),
  /** 退群 */
  exitGroup: ({ roomId }: { roomId: number }) =>
    deleteRequest<Boolean>(urls.exitGroup, {
      roomId,
    }),
}
