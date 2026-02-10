import {
  FaBloggerB,
  FaBook,
  FaDatabase,
  FaLightbulb,
  FaPodcast,
  FaRegChartBar,
  FaRegFileLines,
  FaRegNewspaper,
  FaTriangleExclamation,
} from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { CgFileDocument } from 'react-icons/cg';
import { HiDocumentMagnifyingGlass, HiOutlineAcademicCap } from 'react-icons/hi2';
import { LuClipboardCheck, LuNetwork } from 'react-icons/lu';
import { RiPresentationFill } from 'react-icons/ri';
import {
  BsListColumnsReverse,
  BsDatabaseFillDown,
  BsDatabaseFill,
  BsFillFileEarmarkBarGraphFill,
} from 'react-icons/bs';
import { CiVideoOn } from 'react-icons/ci';
import { TbBrowserShare } from 'react-icons/tb';
import { GiArchiveResearch } from 'react-icons/gi';
import { IoIosOpen } from 'react-icons/io';
import { IoLibrarySharp } from 'react-icons/io5';

// TODO: handle fallback if icon not found
// TODO: figure a way to optimize ALL OF THIS...

const ICON_LIST = [
  // gtrex
  { label: 'Academic Publication', icon: HiOutlineAcademicCap },
  { label: 'Blog', icon: FaBloggerB },
  { label: 'Book or Chapter', icon: FaBook },
  { label: 'Case Study', icon: HiDocumentMagnifyingGlass },
  { label: 'Dashboard or Infographic', icon: FaRegChartBar },
  { label: 'Dataset', icon: FaDatabase },
  { label: 'Guide or Toolkit', icon: LuClipboardCheck },
  { label: 'Magazine or Newspaper Article', icon: FaRegNewspaper },
  { label: 'Podcast', icon: FaPodcast },
  { label: 'Report', icon: FaRegFileLines },
  { label: 'Other', icon: GiArchiveResearch },
  { label: 'Presentation Deck', icon: RiPresentationFill },
  { label: 'Resource Repository', icon: BsListColumnsReverse },
  { label: 'Tools and Models', icon: LuNetwork },
  { label: 'Video', icon: CiVideoOn },
  { label: 'Website or Digital Platform', icon: TbBrowserShare },
  { label: 'External Link', icon: FaExternalLinkAlt },

  // problems-solutions
  { label: 'Problem', icon: FaTriangleExclamation },
  { label: 'Solution', icon: FaLightbulb },

  // datamarts
  { label: 'CgFileDocument', icon: CgFileDocument },
  { label: 'BsDatabaseFillDown', icon: BsDatabaseFillDown },

  // datasets
  { label: 'BsDatabaseFill', icon: BsDatabaseFill },
  { label: 'IoIosOpen', icon: IoIosOpen },
  { label: 'BsFillFileEarmarkBarGraphFill', icon: BsFillFileEarmarkBarGraphFill },
  { label: 'IoLibrarySharp', icon: IoLibrarySharp },
];

export const findIcon = (iconName) => {
  const iconObj = ICON_LIST.find((item) =>
    item.label.toLowerCase().includes(iconName.toLowerCase()),
  );
  return iconObj ? iconObj.icon : null;
};

export const findIconByLabel = (label) => {
  const iconObj = ICON_LIST.find((item) => item.label === label);
  return iconObj ? iconObj.icon : null;
};
