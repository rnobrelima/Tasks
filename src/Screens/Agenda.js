import React, {Component} from 'react'
import {StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Platform} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../Components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class Agenda extends Component{

        state = {
            tasks:[
                { id: Math.random(), desc:'Comprar Curso de React Native ',
                    estimateAt: new Date(), doneAt: new Date() },
                { id: Math.random(), desc: 'Concluir Curso',
                    estimateAt: new Date(), doneAt: null },    
                    { id: Math.random(), desc:'Comprar Curso de React Native ',
                    estimateAt: new Date(), doneAt: new Date() },
                { id: Math.random(), desc: 'Concluir Curso',
                    estimateAt: new Date(), doneAt: null },    
                    { id: Math.random(), desc:'Comprar Curso de React Native ',
                    estimateAt: new Date(), doneAt: new Date() },
                { id: Math.random(), desc: 'Concluir Curso',
                    estimateAt: new Date(), doneAt: null },    
                    { id: Math.random(), desc:'Comprar Curso de React Native ',
                    estimateAt: new Date(), doneAt: new Date() },
                { id: Math.random(), desc: 'Concluir Curso',
                    estimateAt: new Date(), doneAt: null },    
                    { id: Math.random(), desc:'Comprar Curso de React Native ',
                    estimateAt: new Date(), doneAt: new Date() },
                { id: Math.random(), desc: 'Concluir Curso',
                    estimateAt: new Date(), doneAt: null },    
                    { id: Math.random(), desc:'Comprar Curso de React Native ',
                    estimateAt: new Date(), doneAt: new Date() },
                { id: Math.random(), desc: 'Concluir Curso',
                    estimateAt: new Date(), doneAt: null },    
                    { id: Math.random(), desc:'Comprar Curso de React Native ',
                    estimateAt: new Date(), doneAt: new Date() },
                { id: Math.random(), desc: 'Concluir Curso',
                    estimateAt: new Date(), doneAt: null },    
                    { id: Math.random(), desc:'Comprar Curso de React Native ',
                    estimateAt: new Date(), doneAt: new Date() },
                { id: Math.random(), desc: 'Concluir Curso',
                    estimateAt: new Date(), doneAt: null },
            ],
            visibleTasks: [],
            showDoneTasks: true,
        }

        filterTasks = () => {
            let visibleTasks = null 
            if (this.state.showDoneTasks){
                visibleTasks = [...this.state.tasks]
            }else {
                const pending = task => task.doneAt === null 
                visibleTasks = this.state.tasks.filter(pending)
            }
            this.setState({visibleTasks})

        }

        toggleTask = id => {
            const tasks = this.state.tasks.map(task => {
                if (task.id === id ){
                    task = {...task}
                    task.doneAt = task.doneAt ? null : new Date()
                }
                return task 
            
            })
            this.setState({tasks},this.filterTasks)
        }

        togglefilter = () => {
            this.setState({showDoneTasks: !this.state.showDoneTasks}
                ,this.filterTasks)
        }

        componentDidMount = () => {
            this.filterTasks()
        }


    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.togglefilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                  size={20} color={commonStyles.colors.secondary}/>  
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMM')}
                        </Text>

                    </View>

                </ImageBackground>
                <View style={styles.taksContainer}>
                   <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask ={this.toggleTask} />}/>          
                </View>
            
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background:{
        flex: 3,
    },
    titleBar:{
        flex:1,
        justifyContent: 'flex-end',

    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    taksContainer:{
        flex: 7,
    },
    iconBar:{
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',

    }
})
