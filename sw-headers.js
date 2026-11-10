
chrome.runtime.onInstalled.addListener(() => {
    updateRules();
    log('Extension installed.');
});

chrome.runtime.onStartup.addListener(() => {
    updateRules();
    log('Extension started.');
});

chrome.action.onClicked.addListener(() => {
    log('action.onClicked.');
    updateRules();
});

const HEADER_NAME = 'x-HEADER_NAME';
const HEADER_VALUE = 'HEADER_VALUE';
const RULE_ID = (HEADER_NAME + HEADER_VALUE).length;

function updateRules() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [RULE_ID],
        addRules: [
            {
                action: {
                    type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
                    requestHeaders: [
                        {
                            header: HEADER_NAME,
                            operation: 'set',
                            value: HEADER_VALUE
                        }
                    ]
                },
                condition: {
                    urlFilter: "://*.SOME_DOMAIN.com",
                    resourceTypes: Object.values(chrome.declarativeNetRequest.ResourceType)
                    // resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest']
                },
                id: RULE_ID,
                priority: 1
            }
        ]
    },
    () => {
        if (chrome.runtime.lastError) {
            console.error("Error updating rules:" + JSON.stringify(chrome.runtime.lastError));
        } else {
            log("Rules updated successfully.");
        }
    });
}

function log(msg) {
    console.log(`%c${msg}` , 'font-weight: bold; color: white; background-color: green; padding: 4px 8px; border-radius: 4px; font-family: monospace;');
}
