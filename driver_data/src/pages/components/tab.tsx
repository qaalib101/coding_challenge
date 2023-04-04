type TabProps = {
    activeTab: string,
    label: string,
    onClick: (tab: string) => void,
};

export function Tab(props: TabProps) {
    const { activeTab, label, onClick } = props;
    
    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active';
    }

    const onClickTabItem = () => {
        onClick(label);
    }

    return (
        <li
          className={className}
          onClick={onClickTabItem}
        >
          {label}
        </li>
    );
}