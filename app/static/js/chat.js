import { chatControls } from "./control/chatController.js";
import { contentControls } from "./control/contentController.js";
import { historyControls } from "./control/historyController.js";
import { AIControls } from "./control/AIController.js";

const getSideBar = document.getElementById('side-bar');
const getContentBar = document.getElementById('content-bar');
const getSideMiddleBar = document.getElementById('side-middle-bar');

const getChatBar = document.getElementById('chat-bar');
const getTextareaPadding = document.getElementById('textarea-padding');
const getTextareaWrapper = document.getElementById('textarea-wrapper');
const getTextareaChat = document.getElementById('textarea-chat');
const getContentBarWrapper = document.getElementById('content-bar-wrapper');
const getSearchInput = document.getElementById('search-input');

const getSendButton = document.getElementById('send-button');
const getAddButton = document.getElementById('add-button');
const getBackButton = document.getElementById('back-button');
const getSearchButton = document.getElementById('search-button');
const getClearButton = document.getElementById('clear-button');
const getClearTextButton = document.getElementById('clear-text-button');
const getHamburgerButton = document.getElementById('hamburger-button');
const getCancelButton = document.getElementById('cancel-button');
const getAnotherBackButton = document.getElementById('another-back-button');
const getHelpButton = document.getElementById('help-button');

const historyControl = new historyControls(getSideMiddleBar, getAddButton, getClearButton, getSearchButton, getClearTextButton, getSearchInput);
const chatControl = new chatControls(historyControl, getSendButton, getSideMiddleBar, getTextareaChat);
const contentControl = new contentControls(historyControl, getContentBarWrapper);
const AIControl = new AIControls(chatControl, historyControl);

document.addEventListener('sendChat', () => {
    resizeChatBox();
    document.dispatchEvent(new Event('getChat'));
});

getHamburgerButton.addEventListener('click', () => {
    const getAllContent = document.querySelectorAll('.content');
    if(getAllContent) {
        getAllContent.forEach(function(item) {
            item.style.transition = 'opacity 0.3s ease-in-out';
            item.style.opacity = '0.7';
            item.style.pointerEvents = 'none';
        });
    }
    getSideBar.style.left = '0px';
    getCancelButton.style.left = 'calc(' + getSideBar.getBoundingClientRect().width + 'px + 10px)';
});

getCancelButton.addEventListener('click', () => {
    const getAllContent = document.querySelectorAll('.content');
    if(getAllContent) {
        getAllContent.forEach(function(item) {
            item.style.transition = 'opacity 0.3s ease-in-out';
            item.style.opacity = '1';
            item.style.pointerEvents = 'auto';
        });
    }
    getSideBar.style.left = '-100%';
    getCancelButton.style.left = '-100%';
});

window.addEventListener('resize', () => {
    if(window.innerWidth > 750) {
        const getAllContent = document.querySelectorAll('.content');
        if(getAllContent) {
            getAllContent.forEach(function(item) {
                item.style.transition = 'opacity 0.3s ease-in-out';
                item.style.opacity = '1';
                item.style.pointerEvents = 'auto';
            });
        }
        getSideBar.style.left = '0px';
        getCancelButton.style.left = '-100%';
    } else {
        const getAllContent = document.querySelectorAll('.content');
        if(getAllContent) {
            getAllContent.forEach(function(item) {
                item.style.transition = 'opacity 0.3s ease-in-out';
                item.style.opacity = '1';
                item.style.pointerEvents = 'auto';
            });
        }
        getSideBar.style.left = '-100%';
        getCancelButton.style.left = '-100%';        
    }
});

function resizeChatBox() {
    if(getTextareaChat.scrollHeight < 168) {
        getTextareaChat.style.height = '24px';
        getTextareaChat.style.height = getTextareaChat.scrollHeight + 'px';
        getChatBar.style.height = 100 - 24 + getTextareaChat.clientHeight + 'px';
        getTextareaPadding.style.height = 44 - 24 + getTextareaChat.clientHeight + 'px';
        getTextareaWrapper.style.height = 44 - 24 + getTextareaChat.clientHeight + 'px';
    } else {
        getTextareaChat.style.height = '24px';
        getTextareaChat.style.height = '144px';
        getChatBar.style.height = '220px';
        getTextareaPadding.style.height = '164px';
        getTextareaWrapper.style.height = '164px';

        getTextareaChat.style.overflowY = 'auto';
    }
}

getTextareaChat.addEventListener('input', resizeChatBox);

getBackButton.addEventListener('click', () => {
    window.location.href = '/';
});

getAnotherBackButton.addEventListener('click', () => {
    window.location.href = '/';
});

getHelpButton.addEventListener('click', () => {
    window.location.href = 'https://www.w3schools.com/python/default.asp';
});