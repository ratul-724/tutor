// Load Navbar
fetch('nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').outerHTML = data;
    });
// Load Footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').outerHTML = data;
    });

{/* chat section code start here  */}
document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.getElementById('chatIcon');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    let isChatOpen = false;
    // Toggle chat window
    function toggleChat() {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatContainer.classList.add('active');
            messageInput.focus();
            chatIcon.classList.add('d-none');
        } else {
            chatContainer.classList.remove('active');
            chatIcon.classList.remove('d-none');
        }
    }
    // Send message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;
        // Add user message to chat
        addMessage(messageText, 'sent');
        messageInput.value = '';
        // Simulate reply after 1-2 seconds
        setTimeout(() => {
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            chatBody.querySelector('.d-flex').appendChild(typingIndicator);
            chatBody.scrollTop = chatBody.scrollHeight;
            // Remove typing indicator and add reply after delay
            setTimeout(() => {
                typingIndicator.remove();
                const replies = [
                    "Thanks for your message! How can I assist you further?",
                    "I'll check that for you right away.",
                    "Our team will get back to you shortly.",
                    "Is there anything else you'd like to know?",
                    "I'm here to help with any questions you have."
                ];
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                addMessage(randomReply, 'received');
            }, 1500);
        }, 1000 + Math.random() * 1000);
    }
    // Add message to chat
    function addMessage(text, type) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            ${text}
            <div class="message-time">${timeString}</div>
        `;
        chatBody.querySelector('.d-flex').appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    // Event listeners
    chatIcon.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    const hasUnreadMessages = false; 
    if (hasUnreadMessages) {
        toggleChat();
    }
});
{/* chat section code start here  */}