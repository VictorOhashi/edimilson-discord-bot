import { RolesPermissions } from '../constants/permissions';
import RolesController from '../controllers/RolesController';
import { Command } from '../types/Command';
import { Arg, ArgType, ExecuteCommand } from '../types/CommandBase';
import { SubCommand } from '../types/SubCommand';
import { formatColor } from '../utils/colorUtils';

export default class SetColor extends Command {
  commandName = 'setcolor';
  commandDescription = 'Change your current color';

  args: Arg[] = [
    {
      name: 'color',
      description: 'What`s your name',
      required: true,
      type: ArgType.string,
    },
  ];

  run: ExecuteCommand = async (interaction) => {
    const userId = interaction.user.id;

    const rolesController = new RolesController(interaction.guild!);

    const highestPermission = (await rolesController.get(userId))
      .highestPermission;

    if (highestPermission < RolesPermissions.contributor) {
      interaction.reply({
        content: `${interaction.user} você é fraco, lhe falta odio!`,
      });

      return;
    }
    const color = interaction.options.getString('color');

    if (!color) {
      interaction.reply({
        content: `Gerando cor aleatória para ${interaction.user}!`,
      });
    }

    const formatedColor = formatColor(color!);

    if (formatedColor) {
      rolesController.createColorRole(userId, formatedColor);
    } else {
      interaction.reply({
        content: `Só aceito valor do tipo hexcolor, ${interaction.user}!`,
      });
    }
  };
}
