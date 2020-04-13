'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkInsert('Articles', [
        {
          title: 'FrameWork的時代',
          content: 'php本身是類似shell個腳本語言,但是某些框架卻學習了java框架的觀念(Laravel&Symfony),而另一些仍對菜鳥友好(Yii&Codeigniter)',
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          title: '設計OR工程',
          content: '面對突乎其來的裁員,官運不好的我,已不再為此傷心難過,因為人生還有其他很重要的事要做,而這四年來不斷地往工程去學習,雖然很勵志但仍可能有付出代價的淺在可能,如何找到這幾年累積的優勢,勢在必得',
          createdAt:new Date(),
          updatedAt:new Date()
        }
    ], {});
     
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Articles',null, {});

  }
};
