export class historyControls {
    constructor(getSideMiddleBar, getAddButton, getClearButton, getSearchButton, getClearTextButton, getSearchInput) {
        
        this.data = [];        
        this.onChatId = null;
        this.onRemoveId = null;
        this.idNumber = 0;

        var scope = this;

        function createNewChat() {
            if(scope.data.length === 0 || scope.data[scope.data.length - 1].chat.length !== 0) {
                let getChatData = getData();
                scope.data.push(getChatData);
                scope.onChatId = getChatData.id;                
                let getAllChildren = getSideMiddleBar.querySelectorAll('.chat-outliner');
                getAllChildren.forEach(function(item) {
                    item.style.backgroundColor = 'transparent';
                });
                document.dispatchEvent(new Event('getNewChatTab'));
            }            
        }

        function formatDate(date) {
            var currentDate = new Date();
            var yearDiff = currentDate.getFullYear() - date[0];
            var monthDiff = currentDate.getMonth() - date[1];
            var dayDiff = currentDate.getDate() - date[2];
          
            if (yearDiff > 0) {
              return yearDiff === 1 ? '1 year ago' : yearDiff + ' years ago';
            } else if (monthDiff > 0) {
              return monthDiff === 1 ? '1 month ago' : monthDiff + ' months ago';
            } else if (dayDiff > 0) {
              return dayDiff === 1 ? 'Yesterday' : dayDiff + ' days ago';
            } else {
              return 'Today';
            }
        }

        function removeExcessiveSpacesAndNewlines(input) {
            return input.replace(/\s+/g, ' ').trim();
        }

        function createDateTab(id, textDate) {
            let dateTab = document.createElement('div');
            dateTab.id = id;
            dateTab.className = 'chat-outliner date-tab';
            dateTab.style.width = '100%';
            dateTab.style.height = '40px';
            dateTab.style.backgroundColor = 'transparent';
            dateTab.style.padding = '10px';
            dateTab.style.display = 'flex';
            dateTab.style.borderRadius = '0px';
            dateTab.style.justifyContent = 'start';
            dateTab.style.alignItems = 'center';
            dateTab.textContent = removeExcessiveSpacesAndNewlines(textDate);
            getSideMiddleBar.appendChild(dateTab);   
            getSideMiddleBar.insertBefore(dateTab, getSideMiddleBar.firstChild);
        }

        this.createChatOutliner = function(getData) {
            let textContent = getData.chat[0].slice(0, 30);
            let getEmptyMessage = document.getElementById('empty-message');
            if(getEmptyMessage) {
                getEmptyMessage.remove();
            }
            let newChat = document.createElement('div');
            newChat.id = getData.id;
            newChat.className = 'chat-outliner';
            newChat.style.width = '100%';
            newChat.style.height = '40px';
            newChat.style.backgroundColor = 'transparent';
            newChat.style.padding = '10px';
            newChat.style.display = 'flex';
            newChat.style.borderRadius = '0px';
            newChat.style.justifyContent = 'space-between'
            newChat.style.alignItems = 'center';
            getSideMiddleBar.appendChild(newChat);            
            let content = document.createElement('div');            
            content.textContent = textContent;

            content.style.display = 'flex';
            content.style.justifyContent = 'start';
            content.style.alignItems = 'center';

            content.style.width = 'calc(100% - 20px)';
            content.style.height = '100%';
            content.style.backgroundColor = 'transparent';
            content.style.overflow = 'hidden';
            newChat.appendChild(content);

            let remove = document.createElement('div');
            remove.style.width = '20px';
            remove.style.height = '100%';
            remove.setAttribute('title', 'Delete Chat');
            newChat.appendChild(remove);

            let svgBin = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgBin.setAttribute('width', '100%');
            svgBin.setAttribute('height', '100%');    
            svgBin.setAttribute('viewBox', '0 0 200 200');
            svgBin.setAttribute('fill', 'none');
            svgBin.setAttribute('stroke', 'white');
            svgBin.setAttribute('stroke-width', '10');
            remove.appendChild(svgBin);

            let basket = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            basket.setAttribute('x', '40');
            basket.setAttribute('y', '70');
            basket.setAttribute('width', '120');
            basket.setAttribute('height', '100');
            basket.setAttribute('fill', 'none');
            basket.setAttribute('stroke-width', '15');
            svgBin.appendChild(basket);

            let cover1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            cover1.setAttribute('x', '30');
            cover1.setAttribute('y', '30');
            cover1.setAttribute('width', '140');
            cover1.setAttribute('height', '10');
            cover1.setAttribute('fill', 'white');
            svgBin.appendChild(cover1);

            let cover2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            cover2.setAttribute('x', '70');
            cover2.setAttribute('y', '20');
            cover2.setAttribute('width', '60');
            cover2.setAttribute('height', '10');
            cover2.setAttribute('fill', 'white');
            svgBin.appendChild(cover2);
            
            let line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line1.setAttribute('x1', '80');
            line1.setAttribute('y1', '70');
            line1.setAttribute('x2', '80');
            line1.setAttribute('y2', '170');
            line1.setAttribute('stroke-width', '15');
            svgBin.appendChild(line1);

            let line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line2.setAttribute('x1', '120');
            line2.setAttribute('y1', '70');
            line2.setAttribute('x2', '120');
            line2.setAttribute('y2', '170');
            line2.setAttribute('stroke-width', '15');
            svgBin.appendChild(line2);

            let getDateId = getData.date[0].toString() + '-' + getData.date[1].toString() + '-' + getData.date[2].toString();
            let getFormatDate = formatDate(getData.date);
            let isThereAnyDateTab = document.getElementById(getDateId);
            if(isThereAnyDateTab === null) {
                createDateTab(getDateId, getFormatDate);
                let isThereAnyDateTabAgain = document.getElementById(getDateId);
                getSideMiddleBar.insertBefore(newChat, isThereAnyDateTabAgain.nextSibling);
            } else {
                getSideMiddleBar.insertBefore(newChat, isThereAnyDateTab.nextSibling);
            }
            
            newChat.name = getDateId;
            
            if(newChat.id === scope.onChatId) {
                let getAllChildren = getSideMiddleBar.querySelectorAll('.chat-outliner');
                getAllChildren.forEach(function(div) {
                    div.style.backgroundColor = 'transparent';
                });
                newChat.style.backgroundColor = 'rgb(129, 156, 255)';
            }            

            remove.addEventListener('click', (event) => {
                event.stopPropagation();                
                let checkRemove = window.confirm('Are you sure you want to delete ' + textContent + '?');
                if(checkRemove) {
                    scope.onRemoveId = getData.id;
                    let getOutliner = document.getElementById(scope.onRemoveId);
                    
                    let getOutlinerName = getOutliner.name;
                    
                    getOutliner.remove();
                    let newData = scope.data.filter(function(item) {
                        return item.id !== scope.onRemoveId;
                    });
                    scope.data = newData;
                    scope.saveChat();
                    if(scope.onChatId === scope.onRemoveId) {                                    
                        if(scope.data.length === 0) {
                            localStorage.removeItem('saveChatCodePlay');
                            scope.data = [];
                            scope.idNumber = 0;
                            let getAllChildren = getSideMiddleBar.querySelectorAll('.chat-outliner');
                            if(getAllChildren) {
                                getAllChildren.forEach(function(div) {
                                    div.remove();
                                });
                            }
                            createEmptyMessage();
                            createNewChat();                        } else {
                            scope.onChatId = scope.data[scope.data.length - 1].id;
                            let getAllChildren = getSideMiddleBar.querySelectorAll('.chat-outliner');
                            getAllChildren.forEach(function(div) {
                                div.style.backgroundColor = 'transparent';
                            });
                            let getChatOutlinerOnId = document.getElementById(scope.onChatId);
                            getChatOutlinerOnId.style.backgroundColor = 'rgb(129, 156, 255)';
                        }
                    }

                    let checkDate = false;
                    let isThereAnyDateId = getSideMiddleBar.querySelectorAll('.chat-outliner');
                    isThereAnyDateId.forEach(function(item) {
                        if(item.name === getOutlinerName) {
                            checkDate = true;
                            return;
                        }
                    });

                    if(checkDate) {

                    } else {
                        let getDateTabToRemove = document.getElementById(getOutlinerName);
                        if(getDateTabToRemove) {
                            getDateTabToRemove.remove();
                        }
                    }
                }
                document.dispatchEvent(new Event('afterRemoveChat'));
            });

            newChat.addEventListener('pointerenter', () => {
                if(newChat.id !== scope.onChatId) {
                    newChat.style.backgroundColor = 'rgb(174, 192, 255)';
                    newChat.style.cursor = 'pointer';
                } else {                    
                    newChat.style.backgroundColor = 'rgb(129, 156, 255)';
                    newChat.style.cursor = 'pointer';
                }
            });

            newChat.addEventListener('pointerleave', () => {
                if(newChat.id !== scope.onChatId) {
                    newChat.style.backgroundColor = 'transparent';
                    newChat.style.cursor = 'default';
                } else {
                    newChat.style.backgroundColor = 'rgb(129, 156, 255)';
                    newChat.style.cursor = 'default';
                }
            });

            newChat.addEventListener('click', (event) => {
                event.stopPropagation();
                let getAllChildren = getSideMiddleBar.querySelectorAll('.chat-outliner');
                getAllChildren.forEach(function(div) {
                    div.style.backgroundColor = 'transparent';
                });
                newChat.style.backgroundColor = 'rgb(129, 156, 255)';
                scope.onChatId = getData.id;
                document.dispatchEvent(new Event('chooseChat'));
            });      
        }       

        function getData() {
            const currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth();
            let day = currentDate.getDate();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let seconds = currentDate.getSeconds();
            scope.idNumber++;
            let chatData = {
                id: 'chat-' + scope.idNumber,
                date: [year, month, day],
                time: [hours, minutes, seconds],
                chat: [],
                AI: []
            }
            return chatData;
        }

        function createEmptyMessage() {
            let emptyMessage = document.createElement('div');
            emptyMessage.id = 'empty-message';
            emptyMessage.className = 'chat-outliner';
            emptyMessage.style.width = '100%';
            emptyMessage.style.height = '40px';
            emptyMessage.style.backgroundColor = 'transparent';
            emptyMessage.style.padding = '10px';
            emptyMessage.style.display = 'flex';
            emptyMessage.style.borderRadius = '0px';
            emptyMessage.style.justifyContent = 'center';
            emptyMessage.style.alignItems = 'center';
            emptyMessage.textContent = 'No chat history';
            getSideMiddleBar.appendChild(emptyMessage);
        }

        function clearHistory() {
            let isThereAnyHistory = document.getElementById('empty-message')
            if(isThereAnyHistory) {

            } else {
                let checkClear = window.confirm('Are you sure you want to delete everything?');
                if(checkClear) {
                    localStorage.removeItem('saveChatCodePlay');
                    scope.data = [];
                    scope.idNumber = 0;
                    let getAllChildren = getSideMiddleBar.querySelectorAll('.chat-outliner');
                    if(getAllChildren) {
                        getAllChildren.forEach(function(div) {
                            div.remove();
                        });
                    }
                    createEmptyMessage();
                    createNewChat();
                }
            }
        }

        function loadChat() {
            console.log('load history');
            const getChatHistory = localStorage.getItem('saveChatCodePlay');
            scope.data = [];
            scope.idNumber = 0;
            if(getChatHistory) {
                let getChat = JSON.parse(getChatHistory);
                if(getChat.length === 0) {
                    scope.clearHistory();
                } else {
                    getChat.sort(function(item1, item2) {
                        let dateComparison = compareDates(item1.date, item2.date);
                        if(dateComparison !== 0) {
                            return dateComparison;
                        }
                        return compareTimes(item1.time, item2.time);
                    });

                    function compareDates(date1, date2) {
                        for(let index = 0; index < 3; index++) {
                            if(date1[index] !== date2[index]) {
                                return date1[index] - date2[index];
                            }
                        }
                        return 0;
                    }

                    function compareTimes(time1, time2) {
                        for (let index = 0; index < 3; index++) {
                            if (time1[index] !== time2[index]) {
                                return time1[index] - time2[index];
                            }
                        }
                        return 0;
                    }

                    for(let index = 0; index < getChat.length; index++) {
                        scope.onChatId = getChat[index].id;
                        scope.createChatOutliner(getChat[index]);
                    }

                    scope.data = getChat;                

                    let sortId = scope.data;

                    sortId.sort(function(item1, item2) {
                        return item1.id - item2.id;
                    });

                    scope.idNumber = parseInt(sortId[sortId.length - 1].id.match(/\d+/)[0]);
                }
            } else {
                createEmptyMessage();
                createNewChat();
            }
        }

        getAddButton.addEventListener('click', createNewChat);
        
        getClearButton.addEventListener('click', clearHistory);

        function isOnlyWhitespace(input) {
            return /^[\s\n]*$/.test(input);
        }

        function showAllHistoryTab() {
            var hiddenDivs = getSideMiddleBar.querySelectorAll('div[style*="display: none;"]');
            if(hiddenDivs) {
                hiddenDivs.forEach(function(div) {
                    div.style.display = 'flex';
                });
            }
        }

        getSearchButton.addEventListener('click', () => {
            showAllHistoryTab();
            let getInput = getSearchInput.value;
            let checkInput = isOnlyWhitespace(getInput);
            if(checkInput === false) {
                let getDateTabToCheck = [];

                let getAllChildSide = document.querySelectorAll('.chat-outliner');
                getAllChildSide.forEach(function(item) {

                    let found = false;

                    if(item.id.includes('chat-')) {
                        let index1 = scope.data.findIndex(function(obj1) {
                            return obj1.id === item.id;
                        });

                        for(let index2 = 0; index2 < scope.data[index1].chat.length; index2++) {
                            if(scope.data[index1].chat[index2].includes(getInput)) {
                                found = true;
                                let getDateTabId = scope.data[index1].date[0].toString() + '-' +  scope.data[index1].date[1].toString() + '-' +  scope.data[index1].date[2].toString();
                                if(!getDateTabToCheck.includes(getDateTabId)) {
                                    getDateTabToCheck.push(getDateTabId);
                                }
                                break;
                            }
                        }           

                        if(found) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    }               
                });

                let getAllDateTab = getSideMiddleBar.querySelectorAll('.date-tab');
                if(getAllDateTab) {
                    getAllDateTab.forEach(function(div) {
                        if(!getDateTabToCheck.includes(div.id)) {
                            div.style.display = 'none';
                        }
                    });
                }
            }
        });

        getClearTextButton.addEventListener('click', () => {
            getSearchInput.value = '';
            showAllHistoryTab();
        });

        window.addEventListener('DOMContentLoaded', loadChat);
    }

    saveChat() {
        localStorage.setItem('saveChatCodePlay', JSON.stringify(this.data));
    }
}
