
import ko from 'ko';
import {Focused, KeyState} from 'Common/Enums';
import Globals from 'Common/Globals';
import Utils from 'Common/Utils';
import Settings from 'Storage/Settings';

import {AbstractAppStore} from 'Stores/AbstractApp';

class AppUserStore extends AbstractAppStore
{
	constructor()
	{
		super();

		this.currentAudio = ko.observable('');

		this.focusedState = ko.observable(Focused.None);

		this.focusedState.subscribe(function (value) {

			switch (value)
			{
				case Focused.MessageList:
					Globals.keyScope(KeyState.MessageList);
					break;
				case Focused.MessageView:
					Globals.keyScope(KeyState.MessageView);
					break;
				case Focused.FolderList:
					Globals.keyScope(KeyState.FolderList);
					break;
			}

		}, this);

		this.projectHash = ko.observable('');
		this.threadsAllowed = ko.observable(false);

		this.composeInEdit = ko.observable(false);

		this.contactsAutosave = ko.observable(false);
		this.useLocalProxyForExternalImages = ko.observable(false);

		this.contactsIsAllowed = ko.observable(false);

		this.attachmentsActions = ko.observableArray([]);

		this.devEmail = '';
		this.devPassword = '';
	}

	populate() {

		super.populate();

		this.projectHash(Settings.settingsGet('ProjectHash'));

		this.contactsAutosave(!!Settings.settingsGet('ContactsAutosave'));
		this.useLocalProxyForExternalImages(!!Settings.settingsGet('UseLocalProxyForExternalImages'));

		this.contactsIsAllowed(!!Settings.settingsGet('ContactsIsAllowed'));

		const attachmentsActions = Settings.settingsGet('AttachmentsActions');
		this.attachmentsActions(Utils.isNonEmptyArray(attachmentsActions) ? attachmentsActions : []);

		this.devEmail = Settings.settingsGet('DevEmail');
		this.devPassword = Settings.settingsGet('DevPassword');
	};
}

module.exports = new AppUserStore();
