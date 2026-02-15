/**
 * 入口文件
 *
 * 本文件为默认扩展入口文件，如果你想要配置其它文件作为入口文件，
 * 请修改 `extension.json` 中的 `entry` 字段；
 *
 * 请在此处使用 `export`  导出所有你希望在 `headerMenus` 中引用的方法，
 * 方法通过方法名与 `headerMenus` 关联。
 *
 * 如需了解更多开发细节，请阅读：
 * https://prodocs.lceda.cn/cn/api/guide/
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function activate(status?: 'onStartupFinished', arg?: string): void {}

export function openAbout(): void {
	eda.sys_IFrame.openIFrame('/iframe/about.html', 400, 200);
}

export function openIndexPanel(): void {
	eda.sys_IFrame.openIFrame('/iframe/index.html', 600, 400, 'easy-icons-index', {minimizeButton: true});
}

export function openSettings(): void {
	eda.sys_IFrame.openIFrame('/iframe/settings.html', 400, 600);
}

// @ts-ignore
if (!globalThis['__eIcons_INIT_FLAG__']) {
	console.log('[eIcons] 扩展初始化');
	// @ts-ignore
	globalThis['__eIcons_INIT_FLAG__'] = true;
	// @ts-ignore
	eda.sys_ShortcutKey.unregisterShortcutKey(['Shift+I']).then((r) => console.log('[eIcons] 注销快捷键: ', r));
	// @ts-ignore
	eda.sys_ShortcutKey
		.registerShortcutKey(['Shift+I'], 'openEIconsIFrame', async () => {
			if ((await eda.dmt_SelectControl.getCurrentDocumentInfo())?.documentType !== EDMT_EditorDocumentType.PCB) {
				eda.sys_Message.showToastMessage('扩展仅可在 PCB 文档页使用~', ESYS_ToastMessageType.INFO);
				return;
			}

			openIndexPanel();
		})
		.then((r) => console.log('[eIcons] 注册快捷键: ', r));
}
