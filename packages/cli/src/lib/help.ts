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

// copy from link below, the helper.wrap function was removed, but the replacements
// helper.formatItem or helper.boxWrap seem to work differently.
// see: https://github.com/tj/commander.js/pull/2251/files#diff-488a5dbd2d402119d25207b81043066e7c51e17163f89c9b4f96f654180746b6L485
function wrap(str, width, indent, minColumnWidth = 40) {
  // Full \s characters, minus the linefeeds.
  const indents = ' \\f\\t\\v\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff';
  // Detect manually wrapped and indented strings by searching for line break followed by spaces.
  const manualIndent = new RegExp(`[\\n][${indents}]+`);
  if (str.match(manualIndent)) return str;
  // Do not wrap if not enough room for a wrapped column of text (as could end up with a word per line).
  const columnWidth = width - indent;
  if (columnWidth < minColumnWidth) return str;

  const leadingStr = str.slice(0, indent);
  const columnText = str.slice(indent).replace('\r\n', '\n');
  const indentString = ' '.repeat(indent);
  const zeroWidthSpace = '\u200B';
  const breaks = `\\s${zeroWidthSpace}`;
  // Match line end (so empty lines don't collapse),
  // or as much text as will fit in column, or excess text up to first break.
  const regex = new RegExp(`\n|.{1,${columnWidth - 1}}([${breaks}]|$)|[^${breaks}]+?([${breaks}]|$)`, 'g');
  const lines = columnText.match(regex) || [];
  return (
    leadingStr +
    lines
      .map((line, i) => {
        if (line === '\n') return ''; // preserve empty lines
        return (i > 0 ? indentString : '') + line.trimEnd();
      })
      .join('\n')
  );
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
      return wrap(fullText, helpWidth - indent.length, termWidth + itemSeparatorWidth);
    }

    return term;
  }

  function formatText(description: string, indent = 0) {
    return description
      .split(/\n\s*\n/)
      .map((line) => line.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
      .map((line) => wrap(' '.repeat(indent) + line, helpWidth - indent, indent))
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
