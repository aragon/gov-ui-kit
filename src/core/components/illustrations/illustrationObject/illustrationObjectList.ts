import type { SVGProps } from 'react';
import Action from '../../../assets/illustrations/objects/action.svg';
import App from '../../../assets/illustrations/objects/app.svg';
import Archive from '../../../assets/illustrations/objects/archive.svg';
import Book from '../../../assets/illustrations/objects/book.svg';
import Build from '../../../assets/illustrations/objects/build.svg';
import Chain from '../../../assets/illustrations/objects/chain.svg';
import Database from '../../../assets/illustrations/objects/database.svg';
import Error from '../../../assets/illustrations/objects/error.svg';
import Explore from '../../../assets/illustrations/objects/explore.svg';
import Gas from '../../../assets/illustrations/objects/gas.svg';
import Goal from '../../../assets/illustrations/objects/goal.svg';
import Labels from '../../../assets/illustrations/objects/labels.svg';
import Lightbulb from '../../../assets/illustrations/objects/lightbulb.svg';
import MagnifyingGlass from '../../../assets/illustrations/objects/magnifying-glass.svg';
import NotFound from '../../../assets/illustrations/objects/not-found.svg';
import Security from '../../../assets/illustrations/objects/security.svg';
import Settings from '../../../assets/illustrations/objects/settings.svg';
import SmartContract from '../../../assets/illustrations/objects/smart-contract.svg';
import Success from '../../../assets/illustrations/objects/success.svg';
import Timelock from '../../../assets/illustrations/objects/timelock.svg';
import Users from '../../../assets/illustrations/objects/users.svg';
import Wagmi from '../../../assets/illustrations/objects/wagmi.svg';
import Wallet from '../../../assets/illustrations/objects/wallet.svg';
import Warning from '../../../assets/illustrations/objects/warning.svg';
import type { IllustrationObjectType } from './illustrationObjectType';

type IllustrationObjectComponent = React.FC<SVGProps<SVGSVGElement>>;

export const illustrationObjectList: Record<IllustrationObjectType, IllustrationObjectComponent> = {
    ACTION: Action,
    APP: App,
    ARCHIVE: Archive,
    BOOK: Book,
    BUILD: Build,
    CHAIN: Chain,
    DATABASE: Database,
    ERROR: Error,
    EXPLORE: Explore,
    GAS: Gas,
    GOAL: Goal,
    LABELS: Labels,
    LIGHTBULB: Lightbulb,
    MAGNIFYING_GLASS: MagnifyingGlass,
    NOT_FOUND: NotFound,
    SECURITY: Security,
    SETTINGS: Settings,
    SMART_CONTRACT: SmartContract,
    SUCCESS: Success,
    TIMELOCK: Timelock,
    USERS: Users,
    WAGMI: Wagmi,
    WALLET: Wallet,
    WARNING: Warning,
};
