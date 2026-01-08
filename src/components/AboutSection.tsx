import { GraduationCap, Target, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About This <span className="text-gradient-secondary">Project</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A Capstone Project on Traffic Sign Recognition using Deep Learning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-2">GITAM University</h3>
            <p className="text-sm text-muted-foreground">
              Department of Computer Science and Engineering, Bengaluru Campus
            </p>
          </div>

          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-xl gradient-secondary flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Project Team</h3>
            <p className="text-sm text-muted-foreground">
              Aman Kumar under the guidance of Dr. Naga Raju M, Associate Professor
            </p>
          </div>

          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-success/20 flex items-center justify-center mx-auto mb-4">
              <Target className="w-7 h-7 text-success" />
            </div>
            <h3 className="font-semibold mb-2">Project Goals</h3>
            <p className="text-sm text-muted-foreground">
              Develop a robust CNN-based system for real-time traffic sign classification
            </p>
          </div>
        </div>

        {/* Technologies */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">Technologies Used</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Python",
              "TensorFlow",
              "Keras",
              "OpenCV",
              "NumPy",
              "Pandas",
              "CNN",
              "Deep Learning",
              "GTSRB",
              "React",
            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full glass text-sm font-medium hover:border-primary/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
