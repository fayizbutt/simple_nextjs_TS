// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_analytics'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_calendar'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Features',
    items: [
      { title: 'Verified Location', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
      { title: 'Events', path: PATH_DASHBOARD.two, icon: ICONS.ecommerce },
      { title: 'Three', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Four', path: PATH_DASHBOARD.user.four },
          { title: 'Five', path: PATH_DASHBOARD.user.five },
          { title: 'Six', path: PATH_DASHBOARD.user.six },
        ],
      },
    ],
  },
];

export default navConfig;
