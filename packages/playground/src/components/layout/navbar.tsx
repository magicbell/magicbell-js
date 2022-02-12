import cn from 'clsx';
import Link from 'next/link';
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import CodeBell from '~/components/svg/code-bell';
import { ExampleConfig } from '~/lib/utils';

import DarkModeToggle from './dark-mode-toggle';

type NavbarProps = {
  examples: ExampleConfig[];
  currentPath: string;
};

const groupMap = {
  'vanilla-ts': 'javascript',
  'react-ts': 'react',
  vue3: 'vue',
};

const groupNames = {
  javascript: 'JavaScript',
  react: 'React',
  vue: 'Vue',
  angular: 'Angular',
};

function getName(group, slug) {
  const parts = slug.split('-');
  return parts[1] && parts[0] === group
    ? parts.slice(1).join(' ')
    : parts.join(' ');
}

function Navbar({ examples, currentPath }: NavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);

  const [showPopper, setShowPopper] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 16],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: { left: -48, right: -140 },
          boundary: navRef.current,
        },
      },
    ],
  });

  const { grouped, selectedGroup } = useMemo(() => {
    const sorted = [...examples.sort((a, b) => a.slug.localeCompare(b.slug))];
    let selectedExample;
    let selectedGroup;
    const groups: Record<string, { name: string; items: ExampleConfig[] }> = {};

    for (const example of sorted) {
      const group = groupMap[example.template] || example.template;

      if (example.slug === currentPath) {
        selectedExample = example;
        selectedGroup = group;
      }

      // ensure that there is an entry for the group
      groups[group] = groups[group] || { name: group, items: [] };
      groups[group].items.push(example);
    }

    const grouped = Object.values(groups).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return {
      grouped,
      example: selectedExample,
      selectedGroup,
    };
  }, [examples, currentPath]);

  const handleSetActiveGroup: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    setActiveGroup(event.currentTarget.dataset.group);
    setReferenceElement(event.currentTarget);
    setShowPopper(true);
  };

  useEffect(() => {
    if (!navRef.current) return;
    setReferenceElement(navRef.current.querySelector('button'));
  }, [navRef]);

  const group =
    referenceElement && grouped.find((group) => group.name === activeGroup);

  return (
    <nav className="flex-row justify-start mt-6">
      <div className="pr-8">
        <DarkModeToggle />
      </div>

      <div
        ref={navRef}
        className="perspective-2000 relative z-10"
        onMouseLeave={() => {
          setShowPopper(false);
        }}
      >
        {grouped
          .filter((group) => group.items.length)
          .map(({ name: group }) => (
            <button
              key={group}
              data-group={group}
              data-active={group === (activeGroup || selectedGroup)}
              onClick={handleSetActiveGroup}
              onMouseEnter={handleSetActiveGroup}
              className="fg-body px-4"
            >
              {groupNames[group] || group}
            </button>
          ))}

        <div
          ref={setPopperElement}
          className={cn('popper shadow-md transition origin-top duration-250', {
            'opacity-100': showPopper,
            'opacity-0 pointer-events-none': !showPopper,
          })}
          style={{
            ...styles.popper,
            transform: `${styles.popper['transform'] || ''} rotateX(${
              showPopper ? '0deg' : '-15deg'
            })`,
          }}
          {...attributes.popper}
        >
          <ul className="grid grid-flow-col grid-rows-5 gap-x-16 gap-y-4 p-8">
            {group?.items.map((example) => (
              <li key={example.slug}>
                <Link href={example.slug}>
                  <a
                    data-active={example.slug === currentPath}
                    className="fg-popper block w-64"
                  >
                    <div className="truncate">
                      {getName(activeGroup, example.slug)}
                    </div>
                    <div className="text-sm opacity-50 line-clamp-2 h-10">
                      {example.description || ''}
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="arrow-top transition"
            ref={setArrowElement}
            style={styles.arrow}
          />
        </div>
      </div>

      <div className="ml-auto mr-6 relative flex-row">
        <CodeBell />

        <div className="pg-header-arrow absolute w-8 h-8 transform rotate-45 rounded-md bg-editor-header translate-y-12" />
      </div>
    </nav>
  );
}

export default Navbar;
