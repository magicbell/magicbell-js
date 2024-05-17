import { Command, Help } from 'commander';
import kleur from 'kleur';

function sortOptions(a, b) {
  // shorts before longs
  if (a.short && !b.short) return -1;
  if (!a.short && b.short) return 1;
  // move --version to the end
  if (a.long === '--version') return 1;
  if (b.long === '--version') return -1;
  // move ----help to the end
  if (a.long === '--help') return 1;
  if (b.long === '--help') return -1;
  return a.flags > b.flags ? 1 : -1;
}

export function formatHelp(cmd: Command, helper: Help) {
  const termWidth = helper.padWidth(cmd, helper);
  const helpWidth = helper.helpWidth || 80;

  const itemSeparatorWidth = 2; // between term and description
  const indent = ' '.repeat(2);
  const moveOptions = !cmd.parent && cmd.commands.length;

  function formatItem(term, description) {
    if (description) {
      const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
      return helper.wrap(fullText, helpWidth - indent.length, termWidth + itemSeparatorWidth);
    }

    return term;
  }

  function formatText(description: string, indent = 0) {
    return description
      .split(/\n\s*\n/)
      .map((line) => line.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
      .map((line) => helper.wrap(' '.repeat(indent) + line, helpWidth - indent, indent))
      .join('\n\n');
  }

  function formatList(textArray) {
    const list = textArray.join('\n').replace(/^/gm, indent).trim();
    return list ? indent + list : '';
  }

  const sections = {
    description: '',
    usage: '',
    summary: '',
    arguments: '',
    options: [] as { title: string; list: string }[],
    commands: [] as { title: string; list: string }[],
    globalOptions: [] as { title: string; list: string }[],
  };

  sections.description = helper.commandDescription(cmd);
  sections.usage = helper.commandUsage(cmd);
  sections.summary = cmd.summary();
  sections.arguments = formatList(
    helper.visibleArguments(cmd).map((argument) => {
      return formatItem(helper.argumentTerm(argument), helper.argumentDescription(argument));
    }),
  );

  const options = helper
    .visibleOptions(cmd)
    .filter((option) => {
      // move --help to global options
      if (cmd.parent && option.long === '--help') {
        cmd.parent.addOption(option);
        return false;
      }

      return true;
    })
    .sort(sortOptions)
    .map((option) => {
      return formatItem(helper.optionTerm(option), helper.optionDescription(option));
    });

  if (options.length) {
    sections.options.push({
      title: 'Options',
      list: formatList(options),
    });
  }

  // Commands
  const commands: Record<string, Command[]> = {};
  for (const command of helper.visibleCommands(cmd)) {
    const group = ((command as any)._group || 'Commands').trim();
    commands[group] = commands[group] || [];
    commands[group].push(command);
  }

  sections.commands = Object.entries(commands).map(([title, commands]) => ({
    title,
    list: formatList(commands.map((cmd) => formatItem(helper.subcommandTerm(cmd), helper.subcommandDescription(cmd)))),
  }));

  let parent = cmd.parent;

  while (parent) {
    const name = parent.parent
      ? parent
          .name()
          .split('-')
          .map((x) => x[0].toUpperCase() + x.slice(1))
          .join(' ')
      : 'Global';

    const options = helper
      .visibleOptions(parent)
      .filter((option) => {
        // don't return --version on sub commands
        if (option.long === '--version') return false;
        // don't return --help on parent
        if (option.long === '--help' && parent.parent) return false;
        return true;
      })
      .sort(sortOptions)
      .map((option) => {
        return formatItem(helper.optionTerm(option), helper.optionDescription(option));
      });

    if (options.length) {
      sections.globalOptions.push({
        title: `${name} Options`,
        list: formatList(options),
      });
    }

    parent = parent.parent;
  }

  const output = [];
  output.push(formatText(sections.description || sections.summary), '');

  output.push(kleur.bold('Usage'), indent + sections.usage, '');

  if (sections.arguments) {
    output.push(kleur.bold('Arguments'), sections.arguments, '');
  }

  if (sections.options.length && !moveOptions) {
    sections.options.forEach((section) => {
      output.push(kleur.bold(section.title), section.list, '');
    });
  }

  if (sections.commands.length) {
    sections.commands.forEach((section) => {
      output.push(kleur.bold(section.title), section.list, '');
    });
  }

  if (sections.options.length && moveOptions) {
    sections.options.forEach((section) => {
      output.push(kleur.bold(section.title), section.list, '');
    });
  }

  if (sections.globalOptions.length) {
    sections.globalOptions.forEach((section) => {
      output.push(kleur.bold(section.title), section.list, '');
    });
  }

  return output.join('\n');
}
