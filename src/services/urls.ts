// 本地配置到 .env 里面修改。生产配置在 .env.production 里面
const prefix = `capi`

export default {
  getMemberStatistic: `${prefix}/chat/public/member/statistic`,
  getUserInfoBatch: `${prefix}/user/public/summary/userInfo/batch`,
  getBadgesBatch: `${prefix}/user/public/badges/batch`,
  getAllUserBaseInfo: `${prefix}/room/group/member/list`, // 房间内的所有群成员列表-@专用
  getMsgList: `${prefix}/chat/public/msg/page`,
  sendMsg: `${prefix}/chat/msg`,
  getUserInfoDetail: `${prefix}/user/userInfo`, // 获取用户信息详情
  modifyUserName: `${prefix}/user/name`, // 修改用户名
  getBadgeList: `${prefix}/user/badges`, // 徽章列表
  setUserBadge: `${prefix}/user/badge`, // 设置用户徽章
  markMsg: `${prefix}/chat/msg/mark`, // 消息标记
  blockUser: `${prefix}/user/black`, // 拉黑用户
  recallMsg: `${prefix}/chat/msg/recall`, // 撤回消息
  fileUpload: `${prefix}/oss/upload/url`, // 文件上传
  addEmoji: `${prefix}/user/emoji`, // 增加表情
  deleteEmoji: `${prefix}/user/emoji`, // 删除表情
  getEmoji: `${prefix}/user/emoji/list`, // 查询表情包

  // -------------- 好友相关 ---------------
  getContactList: `${prefix}/user/friend/page`, // 联系人列表
  requestFriendList: `${prefix}/user/friend/apply/page`, // 好友申请列表
  sendAddFriendRequest: `${prefix}/user/friend/apply`, // 申请好友
  deleteFriend: `${prefix}/user/friend`, // 删除好友
  newFriendCount: `${prefix}/user/friend/apply/unread`, // 申请未读数

  // -------------- 聊天室相关 ---------------
  getSessionList: `${prefix}/chat/public/contact/page`, // 会话列表
  getMsgReadList: `${prefix}/chat/msg/read/page`, // 消息的已读未读列表
  getMsgReadCount: `${prefix}/chat/msg/read`, // 消息已读未读数
  createGroup: `${prefix}/room/group`, // 新增群组
  getGroupUserList: `${prefix}/room/public/group/member/page`,
  inviteGroupMember: `${prefix}/room/group/member`, // 邀请群成员
  exitGroup: `${prefix}/room/group/member/exit`, // 退群
  addAdmin: `${prefix}/room/group/admin`, // 添加管理员
  revokeAdmin: `${prefix}/room/group/admin`, // 添加管理员
  groupDetail: `${prefix}/room/public/group`, // 群组详情
  sessionDetail: `${prefix}/chat/public/contact/detail`, // 会话详情
  sessionDetailWithFriends: `${prefix}/chat/public/contact/detail/friend`, // 会话详情(联系人列表发消息用)
}
