import type { SVGProps } from 'react';

/** Accessories */
import AccessoryBuddha from '../../../assets/illustrations/human/accessories/buddha.svg';
import AccessoryEarringsCircle from '../../../assets/illustrations/human/accessories/earrings-circle.svg';
import AccessoryEarringsHoops from '../../../assets/illustrations/human/accessories/earrings-hoops.svg';
import AccessoryEarringsRhombus from '../../../assets/illustrations/human/accessories/earrings-rhombus.svg';
import AccessoryEarringsSkull from '../../../assets/illustrations/human/accessories/earrings-skull.svg';
import AccessoryEarringsThunder from '../../../assets/illustrations/human/accessories/earrings-thunder.svg';
import AccessoryExpression from '../../../assets/illustrations/human/accessories/expression.svg';
import AccessoryFlushed from '../../../assets/illustrations/human/accessories/flushed.svg';
import AccessoryHeadFlower from '../../../assets/illustrations/human/accessories/head-flower.svg';
import AccessoryPiercings from '../../../assets/illustrations/human/accessories/piercings.svg';
import AccessoryPiercingsTattoo from '../../../assets/illustrations/human/accessories/piercings-tattoo.svg';
/** Bodies */
import BodyAragon from '../../../assets/illustrations/human/bodies/aragon.svg';
import BodyBlocks from '../../../assets/illustrations/human/bodies/blocks.svg';
import BodyChart from '../../../assets/illustrations/human/bodies/chart.svg';
import BodyComputer from '../../../assets/illustrations/human/bodies/computer.svg';
import BodyComputerCorrect from '../../../assets/illustrations/human/bodies/computer-correct.svg';
import BodyCorrect from '../../../assets/illustrations/human/bodies/correct.svg';
import BodyDoubleCorrect from '../../../assets/illustrations/human/bodies/double-correct.svg';
import BodyElevating from '../../../assets/illustrations/human/bodies/elevating.svg';
import BodyRelaxed from '../../../assets/illustrations/human/bodies/relaxed.svg';
import BodySendingLove from '../../../assets/illustrations/human/bodies/sending-love.svg';
import BodyVoting from '../../../assets/illustrations/human/bodies/voting.svg';
/** Expressions */
import ExpressionAngry from '../../../assets/illustrations/human/expressions/angry.svg';
import ExpressionCasual from '../../../assets/illustrations/human/expressions/casual.svg';
import ExpressionCrying from '../../../assets/illustrations/human/expressions/crying.svg';
import ExpressionDecided from '../../../assets/illustrations/human/expressions/decided.svg';
import ExpressionExcited from '../../../assets/illustrations/human/expressions/excited.svg';
import ExpressionSadLeft from '../../../assets/illustrations/human/expressions/sad-left.svg';
import ExpressionSadRight from '../../../assets/illustrations/human/expressions/sad-right.svg';
import ExpressionSmile from '../../../assets/illustrations/human/expressions/smile.svg';
import ExpressionSmileWink from '../../../assets/illustrations/human/expressions/smile-wink.svg';
import ExpressionSurprised from '../../../assets/illustrations/human/expressions/surprised.svg';
import ExpressionSuspecting from '../../../assets/illustrations/human/expressions/suspecting.svg';
/** Hairs */
import HairsAfro from '../../../assets/illustrations/human/hairs/afro.svg';
import HairsBald from '../../../assets/illustrations/human/hairs/bald.svg';
import HairsBun from '../../../assets/illustrations/human/hairs/bun.svg';
import HairsCool from '../../../assets/illustrations/human/hairs/cool.svg';
import HairsCurly from '../../../assets/illustrations/human/hairs/curly.svg';
import HairsCurlyBangs from '../../../assets/illustrations/human/hairs/curly-bangs.svg';
import HairsInformal from '../../../assets/illustrations/human/hairs/informal.svg';
import HairsLong from '../../../assets/illustrations/human/hairs/long.svg';
import HairsMiddle from '../../../assets/illustrations/human/hairs/middle.svg';
import HairsOldschool from '../../../assets/illustrations/human/hairs/oldschool.svg';
import HairsPunk from '../../../assets/illustrations/human/hairs/punk.svg';
import HairsShort from '../../../assets/illustrations/human/hairs/short.svg';
/** Sunglasses */
import SunglassesBigRounded from '../../../assets/illustrations/human/sunglasses/big-rounded.svg';
import SunglassesBigSemirounded from '../../../assets/illustrations/human/sunglasses/big-semirounded.svg';
import SunglassesLargeStylized from '../../../assets/illustrations/human/sunglasses/large-stylized.svg';
import SunglassesLargeStylizedXl from '../../../assets/illustrations/human/sunglasses/large-stylized-xl.svg';
import SunglassesPirate from '../../../assets/illustrations/human/sunglasses/pirate.svg';
import SunglassesSmallIntellectual from '../../../assets/illustrations/human/sunglasses/small-intellectual.svg';
import SunglassesSmallSympathetic from '../../../assets/illustrations/human/sunglasses/small-sympathetic.svg';
import SunglassesSmallWeirdOne from '../../../assets/illustrations/human/sunglasses/small-weird-one.svg';
import SunglassesSmallWeirdTwo from '../../../assets/illustrations/human/sunglasses/small-weird-two.svg';
import SunglassesThuglife from '../../../assets/illustrations/human/sunglasses/thuglife.svg';
import SunglassesThuglifeRounded from '../../../assets/illustrations/human/sunglasses/thuglife-rounded.svg';

import type {
    IllustrationHumanAccessory,
    IllustrationHumanBody,
    IllustrationHumanExpression,
    IllustrationHumanHairs,
    IllustrationHumanSunglasses,
} from './illustrationHumanType';

type IllustrationHumanComponent = React.FC<SVGProps<SVGSVGElement>>;

export const illustrationHumanAccessoryList: Record<IllustrationHumanAccessory, IllustrationHumanComponent> = {
    BUDDHA: AccessoryBuddha,
    EARRINGS_CIRCLE: AccessoryEarringsCircle,
    EARRINGS_HOOPS: AccessoryEarringsHoops,
    EARRINGS_RHOMBUS: AccessoryEarringsRhombus,
    EARRINGS_SKULL: AccessoryEarringsSkull,
    EARRINGS_THUNDER: AccessoryEarringsThunder,
    EXPRESSION: AccessoryExpression,
    FLUSHED: AccessoryFlushed,
    HEAD_FLOWER: AccessoryHeadFlower,
    PIERCINGS_TATTOO: AccessoryPiercingsTattoo,
    PIERCINGS: AccessoryPiercings,
};

export const illustrationHumanSunglassesList: Record<IllustrationHumanSunglasses, IllustrationHumanComponent> = {
    BIG_ROUNDED: SunglassesBigRounded,
    BIG_SEMIROUNDED: SunglassesBigSemirounded,
    LARGE_STYLIZED_XL: SunglassesLargeStylizedXl,
    LARGE_STYLIZED: SunglassesLargeStylized,
    PIRATE: SunglassesPirate,
    SMALL_INTELLECTUAL: SunglassesSmallIntellectual,
    SMALL_SYMPATHETIC: SunglassesSmallSympathetic,
    SMALL_WEIRD_ONE: SunglassesSmallWeirdOne,
    SMALL_WEIRD_TWO: SunglassesSmallWeirdTwo,
    THUGLIFE_ROUNDED: SunglassesThuglifeRounded,
    THUGLIFE: SunglassesThuglife,
};

export const illustrationHumanBodyList: Record<IllustrationHumanBody, IllustrationHumanComponent> = {
    ARAGON: BodyAragon,
    BLOCKS: BodyBlocks,
    CHART: BodyChart,
    COMPUTER_CORRECT: BodyComputerCorrect,
    COMPUTER: BodyComputer,
    CORRECT: BodyCorrect,
    DOUBLE_CORRECT: BodyDoubleCorrect,
    ELEVATING: BodyElevating,
    RELAXED: BodyRelaxed,
    SENDING_LOVE: BodySendingLove,
    VOTING: BodyVoting,
};

export const illustrationHumanExpressionList: Record<IllustrationHumanExpression, IllustrationHumanComponent> = {
    ANGRY: ExpressionAngry,
    CASUAL: ExpressionCasual,
    CRYING: ExpressionCrying,
    DECIDED: ExpressionDecided,
    EXCITED: ExpressionExcited,
    SAD_LEFT: ExpressionSadLeft,
    SAD_RIGHT: ExpressionSadRight,
    SMILE_WINK: ExpressionSmileWink,
    SMILE: ExpressionSmile,
    SURPRISED: ExpressionSurprised,
    SUSPECTING: ExpressionSuspecting,
};

export const illustrationHumanHairsList: Record<IllustrationHumanHairs, IllustrationHumanComponent> = {
    AFRO: HairsAfro,
    BALD: HairsBald,
    BUN: HairsBun,
    COOL: HairsCool,
    CURLY_BANGS: HairsCurlyBangs,
    CURLY: HairsCurly,
    INFORMAL: HairsInformal,
    LONG: HairsLong,
    MIDDLE: HairsMiddle,
    OLDSCHOOL: HairsOldschool,
    PUNK: HairsPunk,
    SHORT: HairsShort,
};
