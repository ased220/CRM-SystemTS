import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { getUsersAction } from "../store/slices/adminSlice";
import '../styles/users.scss'
import { Button, Flex, Input, Menu, message, Modal, Pagination, Table, Tag, Typography, type MenuProps } from "antd";
import { ArrowRightOutlined, DeleteOutlined, DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { blockUserRequest, deleteUserProfileRequest, unblockUserRequest, updateUserRightRequest } from "../api/adminApi";
import { Roles, type User } from "../types/adminInterface";


const {Text} = Typography;
const { Title } = Typography;
export default function Users(){

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { users, statusUsers, totalAmount } = useAppSelector((state) => state.admin);
    const [isModalOpen, setIsModalOpen] = useState <boolean>(false);

    type ChangeBlock = {
      id:number,
      isBlock:boolean,
    }
    const [isBlock, setIsBlock] = useState<ChangeBlock>({id:-1, isBlock:false})
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

    const [isAdmin, setIsAdmin] = useState( false)
    const [idIsAdmin, setIdIsAdmin] = useState(-1)
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    
    const [searchText, setSearchText] = useState<string>('')
    
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [sortByUsername, setSortByUsername] = useState<boolean>(false);
    const [sortByEmail, setSortByEmail] = useState<boolean>(false);
    
    const [paginationState, setPaginationState] = useState<number>(0);

    useEffect(() =>{
        dispatch(getUsersAction({offset: paginationState}))
    }
    ,[paginationState, dispatch])
    
    
    const handleSortByUsername = ()=>{
      if (!sortByUsername){
        dispatch(getUsersAction(
          {
            sortBy: 'username',
            sortOrder: 'asc',
          }
        ))
        setSortByUsername(true);
      }else{
        dispatch(getUsersAction(
          {
            sortBy: 'username',
            sortOrder: 'desc' 
          }
        ))
        setSortByUsername(false);
      }
    }
    const handleSortByEmail = ()=>{
      if (!sortByEmail){
        dispatch(getUsersAction(
          {
            sortBy: 'email',
            sortOrder: 'asc' 
          }
        ))
        setSortByEmail(true);
      }else{
        dispatch(getUsersAction(
          {
            sortBy: 'email',
            sortOrder: 'desc' 
          }
        ))
        setSortByEmail(false);
      }
    }

    const handleSearch = () =>{
      if (searchText){
          dispatch(getUsersAction(
            {
              search: searchText,
            }
          ))
      }
    }

    const showChangeRightsModal = (id:number, roles: Roles[])=>{

      const role:boolean = roles.includes(Roles.ADMIN);      
      setIsAdmin(role)
      setIdIsAdmin(id)
      setIsAdminModalOpen(true)
    }
    const showChangeBlockModal = (id:number,isBlocked:boolean)=>{
      setIsBlock({id:id, isBlock:isBlocked})
      setIsBlockModalOpen(true)
    }

    const handleIsAdmin = async()=>{
      try {
        if (isAdmin){
          await updateUserRightRequest({ id: idIsAdmin,  roles: [Roles.USER] })
          dispatch(getUsersAction({offset: paginationState}))
          message.success('Данные пользователя изменены');
          setIdIsAdmin(-1)
          setIsAdmin( false )
          setIsAdminModalOpen(false)
        }else{
          await updateUserRightRequest({ id: idIsAdmin, roles: [Roles.ADMIN]})
          dispatch(getUsersAction({offset: paginationState}))
          message.success('Данные пользователя изменены');
          setIdIsAdmin(-1)
          setIsAdmin( false )
          setIsAdminModalOpen(false)
        }
      } catch (error) {
        message.error('Произошла ошибка при изменении данных пользователя');
        setIdIsAdmin(-1)
        setIsAdmin( false )
        setIsAdminModalOpen(false)  
        console.log('не удалось',error);
      }
    }

    const handleIsBlock = async()=>{
      try {
        if (isBlock.isBlock){
          await unblockUserRequest(isBlock.id)
          dispatch(getUsersAction({offset: paginationState}))
          setIsBlock({id:-1, isBlock:false})
          message.success('Пользователь успешно удален');
          setIsBlockModalOpen(false)
        }else{
          await blockUserRequest(isBlock.id);
          dispatch(getUsersAction({offset: paginationState}))
          setIsBlock({id:-1, isBlock:false})
          message.success('Пользователь успешно удален');
          setIsBlockModalOpen(false)
        }
      } catch (error) {
        message.error('Произошла ошибка при удалении пользователя');
        setIsBlockModalOpen(false)  
        console.log('не удалось',error);
        
      }
    }
    const showModal = (id: number) => {
      setSelectedUserId(id);
      setIsModalOpen(true)
    };
    
    const handleOk = async () => {
      if (selectedUserId) {
        try {
          await deleteUserProfileRequest(selectedUserId);
          dispatch(getUsersAction({offset: paginationState}));
          message.success('Пользователь успешно удален');
          setIsModalOpen(false);
        } catch (error) {
          message.error('Произошла ошибка при удалении пользователя');
          console.error('Delete error:', error);
        }
      }
    };
    
    const handleCancel = () => {
      setIsModalOpen(false);
      setIsBlockModalOpen(false);
      setIsAdminModalOpen(false)
    };
    
    
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };

  type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "filter",
    children: [
      {
        key: "1-1",
        label: "Статус блокировки",
        type: "group",
        children: [
          { key: "1", label: "Все" },
          { key: "2", label: "Только заблокированные" },
          { key: "3", label: "Только активные" },
        ],
      },
    ],
  },
];

const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === '1'){
      dispatch(getUsersAction({}))
    }else if (e.key === '2'){
      dispatch(getUsersAction({isBlocked:true}))
    }else{
      dispatch(getUsersAction({isBlocked:false}))
    }
  };

  const columns = [
    {
      title: (
        <Flex align="center">
          <Text>Имя</Text>
          <Button 
            type="link" 
            onClick={handleSortByUsername}
            icon={sortByUsername ? <DownOutlined style={{ color: 'gray' }} /> : <UpOutlined style={{ color: 'gray' }} />}
          />
        </Flex>
      ),
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => <div className="username">{text}</div>,
    },
    {
      title: (
        <Flex align="center">
          <Text>Email</Text>
          <Button 
            type="link" 
            onClick={handleSortByEmail}
            icon={sortByEmail ? <DownOutlined style={{ color: 'gray' }} /> : <UpOutlined style={{ color: 'gray' }} />}
          />
        </Flex>
      ),
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <div className="email">{text}</div>,
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <div className="registration-date">{formatDate(text)}</div>,
    },
    {
      title: 'Статус',
      key: 'isBlocked',
      render: (user: User) => (
        <Tag color={user.isBlocked ? 'red' : 'green'}>
          {user.isBlocked ? 'Заблокирован' : 'Активен'}
        </Tag>
      ),
    },
    {
      title: 'Роли',
      key: 'roles',
      render: (user: User) => (
        <div className="roles-container">
          {user.roles.map((role: string) => {
            let color = '';
            switch (role) {
              case 'USER': color = 'blue'; break;
              case 'ADMIN': color = 'green'; break;
              case 'MODERATOR': color = 'purple'; break;
              default: color = 'gray';
            }
            return (
              <Tag color={color} key={role}>
                {role}
              </Tag>
            );
          })}
        </div>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text: string) => <div className="phone-number">{text || 'Не указан'}</div>,
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (user:User) => (
        <Flex gap="small">
          <Button onClick={() => navigate(`/AdminUserProfile/${user.id}`)}>
            <ArrowRightOutlined />
          </Button>
          <Button onClick={() => showModal(user.id)}>
            <DeleteOutlined />
          </Button>
          <Button onClick={() => showChangeBlockModal(user.id, user.isBlocked)}>
            {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
          </Button>
          <Button onClick={() => showChangeRightsModal(user.id, user.roles)}>
            {user.roles.includes(Roles.ADMIN) ? 'Забрать админку' : 'Дать админку'}
          </Button>
        </Flex>
      ),
    },
  ];

  return (
     <div className="users-table-container">
      <Title level={1}  className="table-title">Пользователи</Title>
      <Flex className="titleContainer">
        <Title level={3}>Пользователи</Title>
        <Flex style={{gap:'10px'}}>
          <Input 
            className="inputSearchEmail"
            placeholder="Поиск по имени или email" 
            prefix={<SearchOutlined />} 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            
            />
          <Button 
            onClick={handleSearch}
            style={{height:'50px'}}  
          >
              Поиск
          </Button>
          <Menu 
            onClick={onClick} 
            style={{ width: 100 }} 
            mode="vertical" 
            items={items} 
            />
        </Flex>
      </Flex>

      {statusUsers === -1 && <p className="loading-message">Загрузка данных...</p>}
      {statusUsers === 500 && <p className="error-message">Ошибка загрузки данных</p>}

      <div className="table-wrapper">
        <Table
          columns={columns}
          dataSource={users.map(user => ({ ...user, key: user.id }))}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
        
        <Pagination 
          defaultCurrent={1} 
          total={Math.ceil(totalAmount / 2)} 
          onChange={(e) => setPaginationState(e - 1)} 
          style={{ margin:'20px auto 20px auto', textAlign: 'center', justifyContent:'center' }}
        />
      </div>
          <Modal
              title="Подтверждение удаления"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Удалить"
              cancelText="Отмена"
              okButtonProps={{ danger: true }}
              closable={true}
              maskClosable={false}
              width={600}
              centered
          >
              <p>Вы уверены, что хотите удалить этого пользователя? </p>
              <p>Это действие нельзя будет отменить </p>
          </Modal>
          <Modal
              title="Подтверждение изменения данных"
              open={isBlockModalOpen}
              onOk={handleIsBlock}
              onCancel={handleCancel}
              okText="Изменить"
              cancelText="Отмена"
              closable={true}
              maskClosable={false}
              width={600}
              centered
          >
              <p>Вы уверены, что хотите изменить данные этого пользователя? </p>
              <p>Это действие нельзя будет отменить </p>
          </Modal>
          <Modal
              title="Подтверждение изменения данных"
              open={isAdminModalOpen}
              onOk={handleIsAdmin}
              onCancel={handleCancel}
              okText="Изменить"
              cancelText="Отмена"
              closable={true}
              maskClosable={false}
              width={600}
              centered
          >
              <p>Вы уверены, что хотите изменить данные этого пользователя? </p>
              <p>Это действие нельзя будет отменить </p>
          </Modal>
    </div>
  );
};
