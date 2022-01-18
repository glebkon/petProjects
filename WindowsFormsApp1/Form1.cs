using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        double h, x, y, n, TrackBarScal = 5, WidthScal = 5, HeightScal = 5, moveScale,moveScale2;
        double x1 = -5, x2 = 5, y1 = -5, y2 = 5;
        int i1, i2, j1, j2;
        string line;
        string a;
        bool draw_func = false;
        bool draw_graf_file = false;
        public Form1()
        {
            InitializeComponent();
        }



        private void CheckBox1_CheckedChanged(object sender, EventArgs e)
        {

            CheckBox checkBox = (CheckBox)sender; // приводим отправителя к элементу типа CheckBox
            if (checkBox.Checked == true)
            {
                draw_func = true;
            }
            else
            {
                draw_func = false;
            }
            draw_graf();
            draw_graf_listbox();

        }
        private void CheckBox2_CheckedChanged(object sender, EventArgs e)
        {
            if (textBox3.TextLength == 0)
            {
                if(checkBox2.Checked==true) MessageBox.Show("Файл не загружен. Отображение невозможно!");
                checkBox2.Checked = false;
            }
            else
            {
                CheckBox checkBox = (CheckBox)sender; // приводим отправителя к элементу типа CheckBox
                if (checkBox.Checked == true)
                {
                    draw_graf_file = true;
                }
                else
                {
                    draw_graf_file = false;
                }
                draw_graf();
                draw_graf_listbox();
            }
        }

        private void Button1_Click(object sender, EventArgs e)
        {
            draw_func = false;
            draw_graf_file = false;
            trackBar1.Value = 5;
            trackBar2.Value = 5;
            trackBar3.Value = 5;
            TrackBarScal = 5; WidthScal = 5; HeightScal = 5;
            label1.Text = "Масштаб: " + 1 + "X";
            textBox1.Text = "0";
            textBox2.Text = "0";
            moveScale = 0;
            moveScale2 = 0;
            checkBox1.Checked = false;
            checkBox2.Checked = false;
            draw_graf();
            draw_graf_listbox();
        }
        private void Button3_Click(object sender, EventArgs e)
        {
            if (textBox1.TextLength!=0) moveScale = double.Parse(textBox1.Text) * 50;
            else moveScale = 0;
            if (textBox2.TextLength != 0) moveScale2 = double.Parse(textBox2.Text) * (-50);
            else moveScale2 = 0;

            draw_graf();
            draw_graf_listbox();
        }
        private void Button4_Click(object sender, EventArgs e)
        {
            openFileDialog1.Filter = "Файлы текста (*.txt) | *.txt";
            openFileDialog1.ShowDialog();
            a = openFileDialog1.FileName;
            textBox3.Text = a;
        }

        private void TrackBar1_Scroll(object sender, EventArgs e)
        {
            TrackBarScal = trackBar1.Value;
            draw_graf();
            draw_graf_listbox();

            label1.Text = "Масштаб: " + TrackBarScal / 5 + "X";
        }
        private void TrackBar2_Scroll(object sender, EventArgs e)
        {
            if (trackBar2.Value != 0) HeightScal = trackBar2.Value;
            else trackBar2.Value = 1;
            draw_graf();
            draw_graf_listbox();
        }
        private void TrackBar3_Scroll(object sender, EventArgs e)
        {
            if (trackBar3.Value != 0) WidthScal = trackBar3.Value;
            else trackBar3.Value = 1;
            draw_graf();
            draw_graf_listbox();
        }
        private void PictureBox1_Click(object sender, EventArgs e)
        {

        }



        double function_for_show(double xt)
        {

            double ff;

            if ((xt < 10) && (xt > 5))
            {
                ff = (Math.Abs(xt * Math.Log(xt - 4)) * Math.Sqrt(xt)) * (1 / Math.Pow(Math.E, (4 * xt - 1) / 5));
            }
            else if ((xt <= 1) && (xt >= 0.1)||(xt <= -0.1) && (xt > -3))
            {
                ff = Math.Pow(xt, -5); // при -20 переполнение стэка (это нормально)
            }
            else if ((xt < 0.1) && (xt > -0.1)) // для обхода точки, где функция = +00
            {
                ff = -100;
            }
            else
            {
                ff = Math.Pow(xt, -10);
            }
            return ff;
        }
        void system_koordinat(double x1, double x2, double y1, double y2)
        {
            Pen pen_setka = new Pen(Brushes.DarkGray, 1);
            pen_setka.DashStyle = System.Drawing.Drawing2D.DashStyle.Dash;
            for(int p = (int)x1;p<=(int)x2;p++)
            {
                pictureBox1.CreateGraphics().DrawLine(pen_setka, xtoi(p), ytoj(y2), xtoi(p), ytoj(y1));
            }
            for (int p = (int)y1; p <= (int)y2; p++)
            {
                pictureBox1.CreateGraphics().DrawLine(pen_setka, xtoi(x1), ytoj(p), xtoi(x2), ytoj(p));
            }
            Pen pen_os = new Pen(Brushes.White, 1);
            pen_os.EndCap = System.Drawing.Drawing2D.LineCap.ArrowAnchor;
            pen_os.StartCap = System.Drawing.Drawing2D.LineCap.Triangle;

            pictureBox1.CreateGraphics().DrawLine(pen_os, xtoi(x1), ytoj(0), xtoi(x2), ytoj(0));
            pictureBox1.CreateGraphics().DrawLine(pen_os, xtoi(0), ytoj(y1), xtoi(0), ytoj(y2));

            Font MyFont = new Font("arial", 8, FontStyle.Regular);

            for (double p = x1; p <= x2; p++)
                pictureBox1.CreateGraphics().DrawString(Convert.ToString(p), MyFont, Brushes.White, new Point(xtoi(p - 0.2), ytoj(-0.05)));
            for (int p = 1; p <= y2; p++)
                pictureBox1.CreateGraphics().DrawString(Convert.ToString(p), MyFont, Brushes.White, new Point(xtoi(-0.5), ytoj(p + 0.1)));
            for (int p = -1; p >= y1; p--)
                pictureBox1.CreateGraphics().DrawString(Convert.ToString(p), MyFont, Brushes.White, new Point(xtoi(-0.6), ytoj(p + 0.1)));

        }
        void draw_graf_listbox()
        {


            if (draw_graf_file)
            {
                StreamReader sr = new StreamReader(a);

                int i = 0;
                double[] Arr = new double[1000];
                while (!sr.EndOfStream)
                {
                    line = sr.ReadLine();
                    Arr[i] = double.Parse(line);
                    i++;
                }
                sr.Close();



                for (int j = 0; j < i - 3; j += 2)
                {

                    float q, w, e, r;
                    q = (float)(xtoi(Arr[j]* HeightScal / 5) + moveScale / (TrackBarScal / 5));
                    w = (float)(ytoj(Arr[j + 1] * (WidthScal / 5)) + moveScale2 / (TrackBarScal / 5));
                    e = (float)(xtoi(Arr[j + 2]* HeightScal / 5) + moveScale / (TrackBarScal / 5));
                    r = (float)(ytoj(Arr[j + 3] * (WidthScal / 5)) + moveScale2 / (TrackBarScal / 5));
                    pictureBox1.CreateGraphics().DrawLine(Pens.Red, q, w, e, r);
                }
            }



        }
        void draw_graf()
        {
            x1 = -5 * (TrackBarScal / 5) ;
            x2 = 5 * (TrackBarScal / 5) ;
            y1 = -5 * (TrackBarScal / 5) ;
            y2 = 5 * (TrackBarScal / 5) ;
            pictureBox1.CreateGraphics().Clear(Color.Gray);

            i1 = 0;
            j1 = 0;
            i2 = pictureBox1.Width - 1;
            j2 = pictureBox1.Height - 1;
            n = pictureBox1.Width;
            system_koordinat(x1, x2, y1, y2);
            h = (x2 - x1) / n;
            x = x1;
           //y = function_for_show(x);
            if (draw_func)
            {
                while (x < x2)
                {
                    float q, w, e, r;
                    q = (float)(xtoi(x * HeightScal / 5) + moveScale / (TrackBarScal / 5));
                    w = (float)(ytoj(function_for_show(x)* (WidthScal / 5)) + moveScale2 / (TrackBarScal / 5));
                    e = (float)(xtoi((x + h) * (HeightScal / 5)) + moveScale / (TrackBarScal / 5));
                    r = (float)(ytoj(function_for_show(x + h) * (WidthScal / 5)) + moveScale2 / (TrackBarScal / 5));
                    pictureBox1.CreateGraphics().DrawLine(Pens.Blue, q, w, e, r);
                    x = x + h;
                }
            }
        }
        int xtoi(double x)
        {
            int ii;
            ii = i1 + (int)Math.Truncate((x - x1) * ((i2 - i1) / (x2 - x1)));
            return ii;
        }
        int ytoj(double y)
        {
            int jj;
            jj = j2 + (int)Math.Truncate((y - y1) * (j1 - j2) / (y2 - y1));
            return jj;
        }
    }
}
