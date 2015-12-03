//
// Point class
//
function Point(x, y, id) // constructor
{
    this.X = x;
    this.Y = y;
    this.ID = id; // stroke ID to which this point belongs (1,2,...)
}
//
// PointCloud class: a point-cloud template
//
function PointCloud(name, points) // constructor
{
    this.Name = name;
    this.Points = Resample(points, NumPoints);
    this.Points = Scale(this.Points);
    this.Points = TranslateTo(this.Points, Origin);
}
//
// Result class
//
function Result(name, score) // constructor
{
    this.Name = name;
    this.Score = score;
}
//
// PDollarRecognizer class constants
//
//var NumPointClouds = 4;
var NumPoints = 32;
var Origin = new Point(0, 0, 0);
//
// PDollarRecognizer class
//
function PDollarRecognizer() // constructor
{
    //
    // this.PointClouds are imported as a parameter of constructor`
    //

    this.PointClouds = new Array();

    this.addGates = function(pointclouds)
    {
        this.PointClouds = pointclouds;
    };



    // this.PointClouds[0] = new PointCloud("AND", new Array(
    //     new Point(499,291,1),new Point(499,237,1),new Point(499,366,1),new Point(499,400,1),
    //     new Point(499,290,2),new Point(531,290,2),new Point(561,290,2),new Point(589,302,2),new Point(607,327,2),new Point(611,347,2),new Point(603,372,2),new Point(587,391,2),new Point(563,401,2),new Point(536,402,2),new Point(500,401,2)
    // ));
    //
    // this.PointClouds[1] = new PointCloud("NAND", new Array(
    //     new Point(499,291,1),new Point(499,237,1),new Point(499,366,1),new Point(499,400,1),
    //     new Point(499,290,2),new Point(531,290,2),new Point(561,290,2),new Point(589,302,2),new Point(607,327,2),new Point(611,347,2),new Point(603,372,2),new Point(587,391,2),new Point(563,401,2),new Point(536,402,2),new Point(500,401,2),
    //     new Point(628,334,3),new Point(617,340,3),new Point(616,348,3),new Point(623,357,3),new Point(636,356,3),new Point(642,346,3),new Point(635,336,3),new Point(629,334,3)
    // ));
    //
    // this.PointClouds[1] = new PointCloud("NOT", new Array(
    //     new Point(323,600,1),new Point(323,619,1),new Point(323,639,1),
    //     new Point(323,600,2),new Point(362,619,2),new Point(323,638,2),
    //     new Point(363,619,3),new Point(365,622,3),new Point(367,623,3),new Point(370,622,3),new Point(371,620,3),new Point(370,617,3),new Point(367,616,3),new Point(364,617,3),new Point(363,619,3)
    // ));

    // this.PointClouds[0] = new PointCloud("OR", new Array(
    //     new Point(493,320,1),new Point(500,334,1),new Point(506,349,1),new Point(510,373,1),new Point(509,390,1),new Point(504,407,1),new Point(498,422,1),new Point(491,432,1),
    //     new Point(492,319,2),new Point(518,319,2),new Point(541,319,2),new Point(553,321,2),new Point(571,326,2),new Point(586,334,2),new Point(601,346,2),new Point(614,361,2),new Point(622,376,2),new Point(610,395,2),new Point(596,410,2),new Point(579,421,2),new Point(557,428,2),new Point(542,431,2),new Point(521,430,2),new Point(493,430,2)
    // ));
    //
    // this.PointClouds[1] = new PointCloud("XOR", new Array(
    //     new Point(472,318,1),new Point(482,332,1),new Point(486,346,1),new Point(492,362,1),new Point(493,374,1),new Point(490,393,1),new Point(485,411,1),new Point(473,431,1),
    //     new Point(493,320,2),new Point(500,334,2),new Point(506,349,2),new Point(510,373,2),new Point(509,390,2),new Point(504,407,2),new Point(498,422,2),new Point(491,432,2),
    //     new Point(492,319,3),new Point(518,319,3),new Point(541,319,3),new Point(553,321,3),new Point(571,326,3),new Point(586,334,3),new Point(601,346,3),new Point(614,361,3),new Point(622,376,3),new Point(610,395,3),new Point(596,410,3),new Point(579,421,3),new Point(557,428,3),new Point(542,431,3),new Point(521,430,3),new Point(493,430,3)
    // ));
    //
    // this.PointClouds[2] = new PointCloud("NOR", new Array(
    //     new Point(493,320,1),new Point(500,334,1),new Point(506,349,1),new Point(510,373,1),new Point(509,390,1),new Point(504,407,1),new Point(498,422,1),new Point(491,432,1),
    //     new Point(492,319,2),new Point(518,319,2),new Point(541,319,2),new Point(553,321,2),new Point(571,326,2),new Point(586,334,2),new Point(601,346,2),new Point(614,361,2),new Point(622,376,2),new Point(610,395,2),new Point(596,410,2),new Point(579,421,2),new Point(557,428,2),new Point(542,431,2),new Point(521,430,2),new Point(493,430,2),
    //     new Point(635,363,3),new Point(625,368,3),new Point(622,379,3),new Point(631,385,3),new Point(635,387,3),new Point(645,382,3),new Point(648,375,3),new Point(641,365,3),new Point(635,363,3)
    // ));
    //
    // this.PointClouds[3] = new PointCloud("XNOR", new Array(
    //     new Point(472,318,1),new Point(482,332,1),new Point(486,346,1),new Point(492,362,1),new Point(493,374,1),new Point(490,393,1),new Point(485,411,1),new Point(473,431,1),
    //     new Point(493,320,2),new Point(500,334,2),new Point(506,349,2),new Point(510,373,2),new Point(509,390,2),new Point(504,407,2),new Point(498,422,2),new Point(491,432,2),
    //     new Point(492,319,3),new Point(518,319,3),new Point(541,319,3),new Point(553,321,3),new Point(571,326,3),new Point(586,334,3),new Point(601,346,3),new Point(614,361,3),new Point(622,376,3),new Point(610,395,3),new Point(596,410,3),new Point(579,421,3),new Point(557,428,3),new Point(542,431,3),new Point(521,430,3),new Point(493,430,3),
    //     new Point(635,363,4),new Point(625,368,4),new Point(622,379,4),new Point(631,385,4),new Point(635,387,4),new Point(645,382,4),new Point(648,375,4),new Point(641,365,4),new Point(635,363,4)
    // ));


    //
    // The $P Point-Cloud Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), DeleteUserGestures()
    //
    this.Recognize = function(points)
    {
        points = Resample(points, NumPoints);
        points = Scale(points);
        points = TranslateTo(points, Origin);

        var b = + Infinity;
        var u = - 1;
        for (var i = 0; i < this.PointClouds.length; i++) // for each point-cloud template
        {
            var d = GreedyCloudMatch(points, this.PointClouds[i]);
            if (d < b) {
                b = d; // best (least) distance
                u = i; // point-cloud
            }
        }
        return (u == - 1) ? new Result("No match.", 0.0) : new Result(this.PointClouds[u].Name, Math.max((b - 2.0) / - 2.0, 0.0));
    };
}
//
// Private helper functions from this point down
//
function GreedyCloudMatch(points, P)
{
    var e = 0.50;
    var step = Math.floor(Math.pow(points.length, 1 - e));
    var min = + Infinity;
    for (var i = 0; i < points.length; i += step) {
        var d1 = CloudDistance(points, P.Points, i);
        var d2 = CloudDistance(P.Points, points, i);
        min = Math.min(min, Math.min(d1, d2)); // min3
    }
    return min;
}
function CloudDistance(pts1, pts2, start)
{
    var matched = new Array(pts1.length); // pts1.length == pts2.length
    for (var k = 0; k < pts1.length; k++)
        matched[k] = false;
    var sum = 0;
    var i = start;
    do
    {
        var index = - 1;
        var min = + Infinity;
        for (var j = 0; j < matched.length; j++)
        {
            if (!matched[j]) {
                var d = Distance(pts1[i], pts2[j]);
                if (d < min) {
                    min = d;
                    index = j;
                }
            }
        }
        matched[index] = true;
        var weight = 1 - ((i - start + pts1.length) % pts1.length) / pts1.length;
        sum += weight * min;
        i = (i + 1) % pts1.length;
    }
    while (i != start);
    return sum;
}
function Resample(points, n)
{
    var I = PathLength(points) / (n - 1); // interval length
    var D = 0.0;
    var newpoints = new Array(points[0]);
    for (var i = 1; i < points.length; i++)
    {
        if (points[i].ID == points[i - 1].ID)
        {
            var d = Distance(points[i - 1], points[i]);
            if ((D + d) >= I)
            {
                var qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
                var qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
                var q = new Point(qx, qy, points[i].ID);
                newpoints[newpoints.length] = q; // append new point 'q'
                points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
                D = 0.0;
            } else
                D += d;
        }
    }
    if (newpoints.length == n - 1) // sometimes we fall a rounding-error short of adding the last point, so add it if so
    newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y, points[points.length - 1].ID);
    return newpoints;
}
function Scale(points)
{
    var minX = + Infinity, maxX = - Infinity, minY = + Infinity, maxY = - Infinity;
    for (var i = 0; i < points.length; i++) {
        minX = Math.min(minX, points[i].X);
        minY = Math.min(minY, points[i].Y);
        maxX = Math.max(maxX, points[i].X);
        maxY = Math.max(maxY, points[i].Y);
    }
    var size = Math.max(maxX - minX, maxY - minY);
    var sizeX = maxX - minX;
    var sizeY = maxY - minY;
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) {
        var qx = (points[i].X - minX) / size;
        var qy = (points[i].Y - minY) / size;
        newpoints[newpoints.length] = new Point(qx, qy, points[i].ID);
    }
    return newpoints;
}
function TranslateTo(points, pt) // translates points' centroid
{
    var c = Centroid(points);
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) {
        var qx = points[i].X + pt.X - c.X;
        var qy = points[i].Y + pt.Y - c.Y;
        newpoints[newpoints.length] = new Point(qx, qy, points[i].ID);
    }
    return newpoints;
}
function Centroid(points)
{
    var x = 0.0, y = 0.0;
    for (var i = 0; i < points.length; i++) {
        x += points[i].X;
        y += points[i].Y;
    }
    x /= points.length;
    y /= points.length;
    return new Point(x, y, 0);
}
function PathDistance(pts1, pts2) // average distance between corresponding points in two paths
{
    var d = 0.0;
    for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
    d += Distance(pts1[i], pts2[i]);
    return d / pts1.length;
}
function PathLength(points) // length traversed by a point path
{
    var d = 0.0;
    for (var i = 1; i < points.length; i++)
    {
        if (points[i].ID == points[i - 1].ID)
            d += Distance(points[i - 1], points[i]);
    }
    return d;
}
function Distance(p1, p2) // Euclidean distance between two points
{
    var dx = p2.X - p1.X;
    var dy = p2.Y - p1.Y;
    return Math.sqrt(dx * dx + dy * dy);
}
