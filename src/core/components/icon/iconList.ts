import { type SVGProps } from 'react';
import AppAssets from '../../assets/icons/app-assets.svg';
import AppDashboard from '../../assets/icons/app-dashboard.svg';
import AppExplore from '../../assets/icons/app-explore.svg';
import AppMembers from '../../assets/icons/app-members.svg';
import AppProposals from '../../assets/icons/app-proposals.svg';
import AppTransactions from '../../assets/icons/app-transactions.svg';
import BlockchainBlock from '../../assets/icons/blockchain-block.svg';
import BlockchainBlockchain from '../../assets/icons/blockchain-blockchain.svg';
import BlockchainGasfee from '../../assets/icons/blockchain-gasfee.svg';
import BlockchainSmartContract from '../../assets/icons/blockchain-smartcontract.svg';
import BlockchainWallet from '../../assets/icons/blockchain-wallet.svg';
import BlockChainWalletConnect from '../../assets/icons/blockchain-walletconnect.svg';
import Calendar from '../../assets/icons/calendar.svg';
import CheckboxIndeterminate from '../../assets/icons/checkbox-indeterminate.svg';
import CheckboxSelected from '../../assets/icons/checkbox-selected.svg';
import Checkbox from '../../assets/icons/checkbox.svg';
import Checkmark from '../../assets/icons/checkmark.svg';
import ChevronDown from '../../assets/icons/chevron-down.svg';
import ChevronLeft from '../../assets/icons/chevron-left.svg';
import ChevronRight from '../../assets/icons/chevron-right.svg';
import ChevronUp from '../../assets/icons/chevron-up.svg';
import Clock from '../../assets/icons/clock.svg';
import Close from '../../assets/icons/close.svg';
import Copy from '../../assets/icons/copy.svg';
import Critical from '../../assets/icons/critical.svg';
import Deposit from '../../assets/icons/deposit.svg';
import DotsHorizontal from '../../assets/icons/dots-horizontal.svg';
import DotsVertical from '../../assets/icons/dots-vertical.svg';
import Expand from '../../assets/icons/expand.svg';
import FavoriteSelected from '../../assets/icons/favorite-selected.svg';
import Favorite from '../../assets/icons/favorite.svg';
import Feedback from '../../assets/icons/feedback.svg';
import Filter from '../../assets/icons/filter.svg';
import Flag from '../../assets/icons/flag.svg';
import Help from '../../assets/icons/help.svg';
import Home from '../../assets/icons/home.svg';
import Info from '../../assets/icons/info.svg';
import LinkExternal from '../../assets/icons/link-external.svg';
import Logout from '../../assets/icons/logout.svg';
import Menu from '../../assets/icons/menu.svg';
import Minus from '../../assets/icons/minus.svg';
import Person from '../../assets/icons/person.svg';
import Plus from '../../assets/icons/plus.svg';
import RadioSelected from '../../assets/icons/radio-selected.svg';
import Radio from '../../assets/icons/radio.svg';
import Reload from '../../assets/icons/reload.svg';
import Remove from '../../assets/icons/remove.svg';
import Rewards from '../../assets/icons/rewards.svg';
import RichtextBold from '../../assets/icons/richtext-bold.svg';
import RichtextHeading from '../../assets/icons/richtext-heading.svg';
import RichtextItalic from '../../assets/icons/richtext-italic.svg';
import RichtextLinkAdd from '../../assets/icons/richtext-link-add.svg';
import RichtextLinkRemove from '../../assets/icons/richtext-link-remove.svg';
import RichtextListOrdered from '../../assets/icons/richtext-list-ordered.svg';
import RichtextListUnordered from '../../assets/icons/richtext-list-unordered.svg';
import Search from '../../assets/icons/search.svg';
import Settings from '../../assets/icons/settings.svg';
import Shrink from '../../assets/icons/shrink.svg';
import Slash from '../../assets/icons/slash.svg';
import SortAsc from '../../assets/icons/sort-asc.svg';
import SortDesc from '../../assets/icons/sort-desc.svg';
import Success from '../../assets/icons/success.svg';
import Warning from '../../assets/icons/warning.svg';
import Withdraw from '../../assets/icons/withdraw.svg';
import { IconType } from './iconType';

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;

export const iconList: Record<IconType, IconComponent> = {
    [IconType.APP_ASSETS]: AppAssets,
    [IconType.APP_DASHBOARD]: AppDashboard,
    [IconType.APP_EXPLORE]: AppExplore,
    [IconType.APP_MEMBERS]: AppMembers,
    [IconType.APP_PROPOSALS]: AppProposals,
    [IconType.APP_TRANSACTIONS]: AppTransactions,
    [IconType.BLOCKCHAIN_BLOCK]: BlockchainBlock,
    [IconType.BLOCKCHAIN_BLOCKCHAIN]: BlockchainBlockchain,
    [IconType.BLOCKCHAIN_GASFEE]: BlockchainGasfee,
    [IconType.BLOCKCHAIN_SMARTCONTRACT]: BlockchainSmartContract,
    [IconType.BLOCKCHAIN_WALLET]: BlockchainWallet,
    [IconType.BLOCKCHAIN_WALLETCONNECT]: BlockChainWalletConnect,
    [IconType.CALENDAR]: Calendar,
    [IconType.CHECKBOX]: Checkbox,
    [IconType.CHECKBOX_INDETERMINATE]: CheckboxIndeterminate,
    [IconType.CHECKBOX_SELECTED]: CheckboxSelected,
    [IconType.CHECKMARK]: Checkmark,
    [IconType.CHEVRON_DOWN]: ChevronDown,
    [IconType.CHEVRON_LEFT]: ChevronLeft,
    [IconType.CHEVRON_RIGHT]: ChevronRight,
    [IconType.CHEVRON_UP]: ChevronUp,
    [IconType.CLOCK]: Clock,
    [IconType.CLOSE]: Close,
    [IconType.COPY]: Copy,
    [IconType.CRITICAL]: Critical,
    [IconType.DEPOSIT]: Deposit,
    [IconType.DOTS_HORIZONTAL]: DotsHorizontal,
    [IconType.DOTS_VERTICAL]: DotsVertical,
    [IconType.EXPAND]: Expand,
    [IconType.FAVORITE]: Favorite,
    [IconType.FAVORITE_SELECTED]: FavoriteSelected,
    [IconType.FEEDBACK]: Feedback,
    [IconType.FILTER]: Filter,
    [IconType.FLAG]: Flag,
    [IconType.HELP]: Help,
    [IconType.HOME]: Home,
    [IconType.INFO]: Info,
    [IconType.LINK_EXTERNAL]: LinkExternal,
    [IconType.LOGOUT]: Logout,
    [IconType.MENU]: Menu,
    [IconType.MINUS]: Minus,
    [IconType.PERSON]: Person,
    [IconType.PLUS]: Plus,
    [IconType.RADIO]: Radio,
    [IconType.RADIO_SELECTED]: RadioSelected,
    [IconType.RELOAD]: Reload,
    [IconType.REMOVE]: Remove,
    [IconType.REWARDS]: Rewards,
    [IconType.RICHTEXT_BOLD]: RichtextBold,
    [IconType.RICHTEXT_HEADING]: RichtextHeading,
    [IconType.RICHTEXT_ITALIC]: RichtextItalic,
    [IconType.RICHTEXT_LINK_ADD]: RichtextLinkAdd,
    [IconType.RICHTEXT_LINK_REMOVE]: RichtextLinkRemove,
    [IconType.RICHTEXT_LIST_ORDERED]: RichtextListOrdered,
    [IconType.RICHTEXT_LIST_UNORDERED]: RichtextListUnordered,
    [IconType.SEARCH]: Search,
    [IconType.SETTINGS]: Settings,
    [IconType.SHRINK]: Shrink,
    [IconType.SLASH]: Slash,
    [IconType.SORT_ASC]: SortAsc,
    [IconType.SORT_DESC]: SortDesc,
    [IconType.SUCCESS]: Success,
    [IconType.WARNING]: Warning,
    [IconType.WITHDRAW]: Withdraw,
};
