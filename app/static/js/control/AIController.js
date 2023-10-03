export class AIControls {
    constructor(chatControl, historyControl) {

        function showPopUp() {
            const popup = document.createElement("div");
            popup.classList.add("popup");
            popup.textContent = 'Please wait a moment!';
            document.body.appendChild(popup);          
            setTimeout(() => {
                document.body.removeChild(popup);
            }, 10000);
        }

        document.addEventListener('getChat', async () => {
            if(chatControl.sendClientChat) {

                const popup = document.createElement("div");
                popup.classList.add("popup");
                popup.textContent = 'Please wait a moment!';
                popup.style.backgroundColor = 'rgb(150, 150, 150)';
                popup.style.borderRadius = '0px';

                document.body.appendChild(popup);

                let getClientChat = chatControl.sendClientChat;
                let AIAnswer = null;
                try {                    
                    const response = await fetch('/run-ai', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(getClientChat)
                    });
                    const data = await response.json();

                    if(data) {
                        document.body.removeChild(popup);
                    }
                    
                    AIAnswer = data;
                } catch(error) {
                    AIAnswer = 'Sorry there was an error!';
                    console.error(error);
                    document.body.removeChild(popup);
                }

                let index = historyControl.data.findIndex(function(item) {
                    return item.id === historyControl.onChatId;
                });
                historyControl.data[index].AI.push(AIAnswer);
                historyControl.saveChat();
                document.dispatchEvent(new Event('afterSavingAIChat'));
            }
        });
    }
}