import BookingSvg from '../assets/svgs/BookingSvg';
import DeleteSvg from '../assets/svgs/DeleteSvg';
import FavoriteSvg from '../assets/svgs/FavoriteSvg';
import GallerySvg from '../assets/svgs/GallerySvg';
import LogoutSvg from '../assets/svgs/LogoutSvg';
import MessageSvg from '../assets/svgs/MessageSvg';
import PersonSvg from '../assets/svgs/PersonSvg';
import ProfileSvg from '../assets/svgs/ProfileSvg';
import SettingSvg from '../assets/svgs/SettingSvg';

export const drawerListData = [
  {
    label: 'My Bookings',
    link: 'Booking',
    svg: <BookingSvg />,
    tabType: 'BottomTabs',
  },
  {
    label: 'All Services',
    link: 'AllServicesScreen',
    svg: <FavoriteSvg />,
    tabType: null,
  },
  {label: 'Gallery', link: 'GalleryScreen', svg: <GallerySvg />, tabType: null},
  {
    label: 'Messages',
    link: 'AdminChatScreen',
    svg: <MessageSvg />,
    tabType: null,
  },
  {
    label: 'Profile',
    link: 'Profile',
    svg: <PersonSvg />,
    tabType: 'BottomTabs',
  },
  // {label: 'Settings', link: 'SettingsScreen', svg: <SettingSvg />},
  {label: 'Log out', svg: <LogoutSvg />, tabType: null},
  {
    label: 'Delete Account',
    svg: <DeleteSvg />,
    tabType: null,
  },
];
