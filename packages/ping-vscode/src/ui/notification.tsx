import { useSignal } from '@preact/signals-react';
import * as icons from '@primer/octicons-react';
import { ArchiveIcon, LinkExternalIcon } from '@primer/octicons-react';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import * as React from 'react';
import { useRef } from 'react';

import { formatDate } from '../lib/date';
import { useMessenger } from '../lib/hooks';
import { styled, theme } from './stitches';

const StyledNotification = styled('div', {
  color: theme.foreground,
  padding: '4px 8px 4px 16px',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  width: '100%',
  background: 'none',
  border: 'none',
  fontFamily: theme.font.family,
  textAlign: 'left',

  lineHeight: '1.4em',
  '&:focus': {},

  '&[data-active]': {
    background: theme.list.activeSelectionBackground,
    outline: `1px solid ${theme.focusBorder}`,
    color: theme.list.activeSelectionForeground,

    '& .body .description': { color: 'unset' },
  },

  '& .content': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    flex: '1 1 auto',
    minWidth: 0,
  },

  '& .header, & .body, & .footer': {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    fontSize: '13px',
    gap: '4px',
    width: '100%',
  },

  '& .footer': {
    alignItems: 'center',
    fontSize: '90%',
    fontWeight: 600,
  },

  '& .footer .category': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },

  '& .footer .actions': {
    display: 'inline-flex',
    gap: '4px',

    '& vscode-button': {
      transition: 'opacity .2s ease',
      opacity: 0,
    },
  },

  '&[data-active] .footer vscode-button, &[data-hover] .footer vscode-button': {
    opacity: 1,
  },

  '& .header .title': {
    fontWeight: 700,
  },

  '& .header .time': {
    fontSize: '80%',
    whiteSpace: 'nowrap',
  },

  '& .body .description': {
    color: theme.descriptionForeground,
  },

  '& .icon': {
    display: 'none',
    flex: 'none',

    '& > *': {
      background: theme.button.background,
      color: theme.icon.foreground,
      borderRadius: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    '@md': {
      display: 'block',
      padding: '8px 6px 10px 0',

      '& > *': {
        width: '24px',
        height: '24px',
      },
    },

    '@lg': {
      display: 'block',
      padding: '10px 14px 10px 0',

      '& > *': {
        width: '42px',
        height: '42px',
      },
    },
  },

  '& .truncate': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const domParser = new DOMParser();
function cleanHtml(html: string) {
  const htmlParser = domParser.parseFromString(html, 'text/html');
  return htmlParser.body.textContent;
}

// see https://primer.style/octicons/
const CategoryIcons = {
  PullRequest: <icons.GitPullRequestIcon size={12} />,
  Issue: <icons.IssueOpenedIcon size={12} />,
  Release: <icons.TagIcon size={12} />,
  Commit: <icons.GitCommitIcon size={12} />,
  Unknown: <icons.QuestionIcon size={12} />,
};

export function Notification(props: {
  id: string;
  content: string;
  sent_at: Date;
  title: string;
  active?: boolean;
  onClick?: () => void;
  avatarUrl: string;
  category?: string;
  actionUrl: string;
}) {
  const messenger = useMessenger();

  const handleClickArchive = () => messenger.post('archive', props.id);
  const handleClickOpen = () => messenger.post('open-url', props.actionUrl);

  const hoverSignal = useSignal(false);
  const timeout = useRef(null);
  const icon = CategoryIcons[props.category] || CategoryIcons.Unknown;

  const onMouseEnter = () => {
    timeout.current = setTimeout(() => (hoverSignal.value = true), 250);
  };

  const onMouseLeave = () => {
    clearTimeout(timeout.current);
    hoverSignal.value = false;
  };

  return (
    <StyledNotification
      data-active={props.active || undefined}
      data-hover={hoverSignal.value || undefined}
      onClick={props.onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.avatarUrl && (
        <div className="icon">
          <img alt="" src={props.avatarUrl} />
        </div>
      )}

      <div className="content">
        <div className="header">
          <div className="title truncate">{props.title}</div>
          <div className="time">{formatDate(props.sent_at)}</div>
        </div>
        <div className="body">
          <div className="description">{cleanHtml(props.content)}</div>
        </div>
        <div className="footer">
          <div className="category">
            {icon} {props.category}
          </div>

          <div className="actions">
            {props.actionUrl ? (
              <VSCodeButton appearance="icon" onClick={handleClickOpen}>
                <LinkExternalIcon size={12} />
              </VSCodeButton>
            ) : null}
            <VSCodeButton appearance="icon" onClick={handleClickArchive}>
              <ArchiveIcon size={12} />
            </VSCodeButton>
          </div>
        </div>
      </div>
    </StyledNotification>
  );
}
