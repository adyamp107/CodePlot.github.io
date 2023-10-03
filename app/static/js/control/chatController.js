export class chatControls {
    constructor(historyControl, getSendButton, getSideMiddleBar, getTextareaChat) {

        this.sendClientChat = null;

        var clientChat = null;
        
        function isOnlyWhitespace(input) {
            return /^[\s\n]*$/.test(input);
        }

        getSendButton.addEventListener('click', () => {
            if(historyControl.onChatId) {                
                let checkTextInput = getTextareaChat.value;
                if(checkTextInput) {
                    clientChat = checkTextInput;
                    let checkOnlyWhiteSpace = isOnlyWhitespace(clientChat);
                    if(checkOnlyWhiteSpace === false) {
                        let index = historyControl.data.findIndex(item => item.id === historyControl.onChatId);
                        historyControl.data[index].chat.push(clientChat);
                        getTextareaChat.value = '';                        
                        let foundItem = null;
                        let getAllChildren = getSideMiddleBar.querySelectorAll('.chat-outliner');
                        getAllChildren.forEach(function(item) {
                            if(item.id === historyControl.onChatId) {
                                foundItem = item;
                                return;
                            }
                        });
    
                        if(foundItem === null) {
                            historyControl.createChatOutliner(historyControl.data[index]);
                        }                    
                        historyControl.saveChat();
                        this.sendClientChat = clientChat;
                        document.dispatchEvent(new Event('sendChat'));    
                    }
                }                
            }
        });
    }
}
