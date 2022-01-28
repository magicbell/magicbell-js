import cn from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';

import { ExampleConfig } from '~/lib/utils';

type SidebarProps = { currentPath: string; examples: ExampleConfig[] };

const groupMap = {
  'vanilla-ts': 'javascript',
  'react-ts': 'react',
  vue3: 'vue',
};

function getName(group, slug) {
  const parts = slug.split('-');
  return parts[1] && parts[0] === group
    ? parts.slice(1).join(' ')
    : parts.join(' ');
}

function Sidebar({ examples, currentPath }: SidebarProps) {
  const grouped = useMemo(() => {
    const sorted = [...examples.sort((a, b) => a.slug.localeCompare(b.slug))];
    const groups: Record<string, { name: string; items: ExampleConfig[] }> = {};

    for (const example of sorted) {
      // determine the group name based on declared dependencies, note order matters
      // we can have examples that declared both @magicbell/headless && @magicbell/react
      const group = groupMap[example.template] || example.template;

      // ensure that there is an entry for the group
      groups[group] = groups[group] || { name: group, items: [] };
      groups[group].items.push(example);
    }

    return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name));
  }, [examples]);

  return (
    <nav className="w-full h-full overflow-y-scroll px-8 pt-12 text-gray-900 dark:text-white">
      <ul>
        {grouped.map(({ name: group, items }) => (
          <li key={group} className="mb-12">
            <div className="font-bold pt-0.5 pb-4">{group}</div>
            <ul className="pl-4">
              {items.map((example) => (
                <li key={example.slug}>
                  <Link href={`/example/${example.slug}`}>
                    <a
                      className={cn('py-0.5 block hover:text-pink-800', {
                        'text-pink-900': example.slug === currentPath,
                      })}
                    >
                      {getName(group, example.slug)}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
