import 'package:flutter/material.dart';
import 'image_banner.dart';
import 'style.dart';
import 'text_file.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context){
    return new MaterialApp(
      home: TextSectionClass(),
      theme: ThemeData(
        appBarTheme: AppBarTheme(
          textTheme: TextTheme(title: AppBarTextStyle)
        ),
        textTheme: TextTheme(
        title: TitleTextStyle,
        body1: Body1TextStyle,
        ),
      ),
    );
  }
}

class TextSectionClass extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return new Scaffold(
        appBar: new AppBar(
          title: new Text('Hello'),
        ),
        body: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children:[
              ImageBanner("assets/images/kiyomizu-dera.jpg"),
              TextSection("sumamry1", "hola blaaksdfjashdfjklahsdfkjasdfkjasdjkfhasjkdfhas lkjahsdfkljahsd fkljahsd fkjashd fjklashdf"),
              TextSection("summary2","Pedo ajkasdfjkhsdkjfhasjkdhfaskljdhfaksjldhfaklsjdhfaskljdhfal alkjshdfjkahsdf"),
              TextSection("summary3", "Pis jklshdfkjhasdlkjf haskjdf asjkdhf kajshdf ksajhdfaksjdhf aljksdhfahhhhh"),

            ]
        )
    );
  }

}








