<template>
    <div>
        <pre>{{ JSON.stringify(mappedChats, null, 2) }}</pre>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

interface Message {
    id: number;
    sender_id: string;
    receiver_id: string;
    content: string;
    status: boolean;
    type: "USER" | "GROUP";
    msg_type: string;
    msg_title: string | null;
    message_id: string;
    link: string | null;
    channel_type: string;
    time: string;
    ref_bot_id: number;
    ref_user_id: number | null;
    ref_group_id: number | null;
}

interface User {
    id: number;
    uid: string;
    name: string;
    avatar: string;
    phone: string;
    email: string | null;
    botConnectUser: {
        bot_id: string;
        name_alias: string | null;
        active_notification: boolean;
        un_read: number;
    };
}

interface Group {
    id: number;
    row_bot_id: number | null;
    bot_id: string;
    group_id: string;
    name: string;
    avatar: string;
    full_avatar: string;
    creator_id: string;
    count_member: number;
    status_reply: boolean;
    active_notification: boolean;
    un_read: number;
    name_alias: string | null;
    is_deleted: boolean;
}

interface Chat {
    id: string;
    uid: string;
    bot_id: string;
    name: string;
    name_alias: string;
    phone: string;
    dob: string;
    avatar: string;
    bot_avatar: string;
    bot_name: string;
    bot_active: number;
    lastMessage: string;
    lastMessageTime: string;
    type: string;
    msg_type: string;
    active_notification: number;
    is_active_off: number;
    count_member: number;
    unread: number;
    message_id?: number;
}

interface MessageData {
    messages: Message[];
    users: Record<string, User>;
    groups: Record<string, Group>;
    botActives: Record<string, boolean>;
}

const listMessages = ref({
    "messages": [
        {
            "id": 46,
            "sender_id": "2189972001322916909",
            "receiver_id": "784846925525567661",
            "content": "ihiihih",
            "status": false,
            "type": "USER",
            "msg_type": "CHAT",
            "msg_title": null,
            "message_id": "7021717108755",
            "link": null,
            "channel_type": "zalo",
            "time": "2025-09-17T10:07:38.000Z",
            "ref_bot_id": 107,
            "ref_user_id": 169,
            "ref_group_id": null
        },
        {
            "id": 45,
            "sender_id": "1108477822670359868",
            "receiver_id": "2153857623592819130",
            "content": "Hii",
            "status": false,
            "type": "USER",
            "msg_type": "CHAT",
            "msg_title": null,
            "message_id": "7020684845121",
            "link": null,
            "channel_type": "zalo",
            "time": "2025-09-17T05:18:39.000Z",
            "ref_bot_id": 102,
            "ref_user_id": 162,
            "ref_group_id": null
        },
        {
            "id": 44,
            "sender_id": "2153857623592819130",
            "receiver_id": "2204130611871688904",
            "content": "Đa phần sẽ như thế",
            "status": false,
            "type": "GROUP",
            "msg_type": "CHAT",
            "msg_title": null,
            "message_id": "7018205738563",
            "link": null,
            "channel_type": "zalo",
            "time": "2025-09-16T10:30:58.000Z",
            "ref_bot_id": 102,
            "ref_user_id": null,
            "ref_group_id": 2
        }
    ],
    "users": {
        "162": {
            "id": 162,
            "uid": "1108477822670359868",
            "name": "Văn Trí",
            "avatar": "https://s120-ava-talk.zadn.vn/6/1/b/e/7/120/fe74feab54b0a516a0a6aaf1e7f38839.jpg",
            "phone": "",
            "email": null,
            "botConnectUser": {
                "bot_id": "2153857623592819130",
                "name_alias": null,
                "active_notification": true,
                "un_read": 1
            }
        },
        "169": {
            "id": 169,
            "uid": "2189972001322916909",
            "name": "Văn Trí",
            "avatar": "https://s120-ava-talk.zadn.vn/6/1/b/e/7/120/fe74feab54b0a516a0a6aaf1e7f38839.jpg",
            "phone": "",
            "email": null,
            "botConnectUser": {
                "bot_id": "784846925525567661",
                "name_alias": null,
                "active_notification": true,
                "un_read": 1
            }
        }
    },
    "groups": {
        "2": {
            "id": 2,
            "row_bot_id": null,
            "bot_id": "2153857623592819130",
            "group_id": "2204130611871688904",
            "name": "Nguyen Truong Luan, Văn Trí, Chat Bot Two",
            "avatar": "",
            "full_avatar": "",
            "creator_id": "2153857623592819130",
            "count_member": 2,
            "status_reply": false,
            "active_notification": true,
            "un_read": 0,
            "name_alias": null,
            "is_deleted": false
        }
    },
    "botActives": {
        "784846925525567661": true,
        "2153857623592819130": true
    }
} as MessageData);

const mappedChats = computed(() => {
    const chatMap = new Map<string, Chat>();
    const data = listMessages.value;

    for (const message of data.messages) {
        // Xử lý USER chat
        if (message.type === 'USER' && message.ref_user_id) {
            const user = data.users[message.ref_user_id.toString()];
            if (!user) continue;

            const chatKey = `user_${message.ref_user_id}_${message.ref_bot_id}`;

            if (!chatMap.has(chatKey)) {
                chatMap.set(chatKey, {
                    id: `${message.ref_user_id}_${message.ref_bot_id}`,
                    uid: user.uid,
                    bot_id: user.botConnectUser.bot_id,
                    name: user.name,
                    name_alias: user.botConnectUser.name_alias || '',
                    phone: user.phone,
                    dob: '',
                    avatar: user.avatar,
                    bot_avatar: '',
                    bot_name: '',
                    bot_active: data.botActives[user.botConnectUser.bot_id] ? 1 : 0,
                    lastMessage: message.content,
                    lastMessageTime: message.time,
                    type: 'USER',
                    msg_type: message.msg_type,
                    active_notification: user.botConnectUser.active_notification ? 1 : 0,
                    is_active_off: 0,
                    count_member: 1,
                    unread: user.botConnectUser.un_read,
                    message_id: message.id
                });
            } else {
                const existingChat = chatMap.get(chatKey)!;
                if (new Date(message.time) > new Date(existingChat.lastMessageTime)) {
                    existingChat.lastMessage = message.content;
                    existingChat.lastMessageTime = message.time;
                    existingChat.message_id = message.id;
                }
            }
        }

        // Xử lý GROUP chat  
        if (message.type === 'GROUP' && message.ref_group_id) {
            const group = data.groups[message.ref_group_id.toString()];
            if (!group) continue;

            const chatKey = `group_${message.ref_group_id}_${message.ref_bot_id}`;

            if (!chatMap.has(chatKey)) {
                chatMap.set(chatKey, {
                    id: `${message.ref_group_id}_${message.ref_bot_id}`,
                    uid: group.group_id,
                    bot_id: group.bot_id,
                    name: group.name,
                    name_alias: group.name_alias || '',
                    phone: '',
                    dob: '',
                    avatar: group.avatar,
                    bot_avatar: '',
                    bot_name: '',
                    bot_active: data.botActives[group.bot_id] ? 1 : 0,
                    lastMessage: message.content,
                    lastMessageTime: message.time,
                    type: 'GROUP',
                    msg_type: message.msg_type,
                    active_notification: group.active_notification ? 1 : 0,
                    is_active_off: group.status_reply ? 1 : 0,
                    count_member: group.count_member,
                    unread: group.un_read,
                    message_id: message.id
                });
            } else {
                const existingChat = chatMap.get(chatKey)!;
                if (new Date(message.time) > new Date(existingChat.lastMessageTime)) {
                    existingChat.lastMessage = message.content;
                    existingChat.lastMessageTime = message.time;
                    existingChat.message_id = message.id;
                }
            }
        }
    }

    return Array.from(chatMap.values()).sort((a, b) =>
        new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );
});
</script>

<style scoped>
pre {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow: auto;
}

h2 {
    margin: 2rem 0 1rem 0;
    color: #333;
}
</style>