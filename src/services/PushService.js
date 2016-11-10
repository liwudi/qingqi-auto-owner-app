/**
 * Created by ligj on 2016/11/9.
 */

const STORAGE_KEY_MESSAGE_LIST = 'pushMessageList';
const STORAGE_KEY_MESSAGE_IDS = 'pushMessageListIds';

export function addMessage  (message)  {
    let messageId = new Date().getTime() + '';
    //保存消息
    return global.storage.save({
        key: STORAGE_KEY_MESSAGE_LIST,
        id: messageId,
        rawData: {
            message : message,
            time: new Date()
        },
        expires: null
    });
};

export function  readAllMessage  ()  {
    return global.storage.getAllDataForKey(STORAGE_KEY_MESSAGE_LIST);
}

export function  readMessage  (messageId)  {
    global.storage.load({
        key: STORAGE_KEY_MESSAGE_LIST,
        id: messageId
    });
}

export function  removeMessage (messageId)  {
    // 删除单个数据
    global.storage.remove({
        key: STORAGE_KEY_MESSAGE_LIST,
        id: messageId
    });
};

export function  removeAllMessage  ()  {
    // 删除数据
    global.storage.remove({
        key: STORAGE_KEY_MESSAGE_LIST
    });
};

