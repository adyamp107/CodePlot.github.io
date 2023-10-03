export class contentControls {
    constructor(historyControl, getContentBarWrapper) {

        function createClientChat(textContent) {
            let clientChatBar = document.createElement('div');
            clientChatBar.className = 'client-chat-bar';
            clientChatBar.style.width = '80%';
            clientChatBar.style.height = 'fit-content';
            clientChatBar.style.marginLeft = '10%';
            clientChatBar.style.marginTop = '20px';
            clientChatBar.style.marginBottom = '20px';
            clientChatBar.style.backgroundColor = 'rgb(71, 111, 255)';
            clientChatBar.style.padding = '20px';
            clientChatBar.style.display = 'flex';
            clientChatBar.style.borderRadius = '5px';
            clientChatBar.style.justifyContent = 'start';
            clientChatBar.style.alignItems = 'center';
            clientChatBar.style.display = 'flex';
            clientChatBar.style.alignItems = 'start';
            getContentBarWrapper.appendChild(clientChatBar); 

            let user = document.createElement('div');
            user.style.width = '30px';
            user.style.height = '30px';
            user.style.backgroundColor = 'red';
            user.style.borderRadius = '100px';
            user.style.border = '2px solid white';
            clientChatBar.appendChild(user);     

            let svgUser = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgUser.setAttribute('width', '100%');
            svgUser.setAttribute('height', '100%');    
            svgUser.setAttribute('viewBox', '0 0 200 200');
            svgUser.setAttribute('fill', 'none');
            svgUser.setAttribute('stroke', 'white');
            svgUser.setAttribute('stroke-width', '10');
            user.appendChild(svgUser);

            let head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            head.setAttribute('cx', '100');
            head.setAttribute('cy', '90');
            head.setAttribute('r', '40');
            head.setAttribute('fill', 'white');
            svgUser.appendChild(head);

            let body = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            body.setAttribute('cx', '100');
            body.setAttribute('cy', '250');
            body.setAttribute('r', '100');
            body.setAttribute('fill', 'white');
            svgUser.appendChild(body);
            
            let text = document.createElement('textarea');
            text.value = textContent;
            text.style.width = 'calc(100% - 30px)';
            text.style.height = 'auto';
            text.style.overflow = 'hidden';
            text.style.backgroundColor = 'transparent';
            text.style.borderRadius = '5px';
            text.style.padding = '10px 10px 10px 20px';
            text.style.outline = 'none';
            text.style.resize = 'none';
            text.style.border = 'none';

            clientChatBar.appendChild(text);

            function adjustTextareaHeight() {
                text.style.height = 'auto';                
                text.style.height = (text.scrollHeight) + 'px';
            }

            adjustTextareaHeight();
        }

        function createAIChat(answerContent) {
            let AIChatBar = document.createElement('div');
            AIChatBar.className = 'AI-chat-bar';
            AIChatBar.style.width = '80%';
            AIChatBar.style.height = 'fit-content';
            AIChatBar.style.marginLeft = '10%';
            AIChatBar.style.marginTop = '20px';
            AIChatBar.style.marginBottom = '20px';
            AIChatBar.style.backgroundColor = 'rgb(210, 210, 210)';
            AIChatBar.style.padding = '20px';
            AIChatBar.style.display = 'flex';
            AIChatBar.style.borderRadius = '5px';
            AIChatBar.style.justifyContent = 'start';
            AIChatBar.style.alignItems = 'center';
            AIChatBar.style.display = 'flex';
            AIChatBar.style.alignItems = 'start';
            getContentBarWrapper.appendChild(AIChatBar); 

            let AI = document.createElement('div');
            AI.style.width = '30px';
            AI.style.height = '30px';
            AI.style.backgroundColor = 'Blue';
            AI.style.borderRadius = '100px';
            AI.style.color = 'white';
            AI.style.fontWeight = 'bold';
            AI.style.border = '2px solid white';
            AIChatBar.appendChild(AI);  
            
            let svgAI = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgAI.setAttribute('width', '100%');
            svgAI.setAttribute('height', '100%');    
            svgAI.setAttribute('viewBox', '0 0 200 200');
            svgAI.setAttribute('fill', 'none');
            svgAI.setAttribute('stroke', 'white');
            svgAI.setAttribute('stroke-width', '10');
            AI.appendChild(svgAI);

            let head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            head.setAttribute('cx', '100');
            head.setAttribute('cy', '90');
            head.setAttribute('r', '40');
            head.setAttribute('fill', 'white');
            svgAI.appendChild(head);

            let body = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            body.setAttribute('cx', '100');
            body.setAttribute('cy', '250');
            body.setAttribute('r', '100');
            body.setAttribute('fill', 'white');
            svgAI.appendChild(body);
            
            let answer = document.createElement('textarea');
            answer.value = answerContent;
            answer.style.width = 'calc(100% - 30px)';
            answer.style.height = 'auto';
            answer.style.overflow = 'hidden';
            answer.style.backgroundColor = 'transparent';
            answer.style.borderRadius = '5px';
            answer.style.padding = '10px 10px 10px 20px';
            answer.style.outline = 'none';
            answer.style.resize = 'none';
            answer.style.border = 'none';
            answer.style.color = 'rgb(0, 0, 0)';
            AIChatBar.appendChild(answer);

            function adjustTextareaHeight() {
                answer.style.height = 'auto';                
                answer.style.height = (answer.scrollHeight) + 'px';
            }

            adjustTextareaHeight();
        }

        function deleteAllChat() {
            let getAllClientChat = getContentBarWrapper.querySelectorAll('.client-chat-bar');
            if(getAllClientChat) {
                getAllClientChat.forEach(function(item) {
                    item.remove();
                });
            }
            let getAllAIChat = getContentBarWrapper.querySelectorAll('.AI-chat-bar');
            if(getAllAIChat) {
                getAllAIChat.forEach(function(item) {
                    item.remove();
                });
            }
        }

        function showChat() {
            deleteAllChat();
            let index1 = historyControl.data.findIndex(function(item) {
                return item.id === historyControl.onChatId;
            });        
            for(let index2 = 0; index2 < historyControl.data[index1].chat.length; index2++) {                
                createClientChat(historyControl.data[index1].chat[index2]);
                createAIChat(historyControl.data[index1].AI[index2])
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            if(historyControl.onChatId) {
                showChat();
            }
        });

        document.addEventListener('chooseChat', () => {
            if(historyControl.onChatId) {
                showChat();
            }
        });

        document.addEventListener('getNewChatTab', () => {
            if(historyControl.onChatId) {
                showChat();
            }
        });
    
        document.addEventListener('afterSavingAIChat', () => {
            if(historyControl.onChatId) {
                showChat();
            }
        });

        document.addEventListener('afterRemoveChat', () => {
            if(historyControl.onChatId) {
                showChat();
            }
        });
    }
}